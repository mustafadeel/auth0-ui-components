'use client';

import * as React from 'react';
import type { Auth0ComponentConfig, AuthDetails } from './types';
import { ThemeProvider } from './theme-provider';

/**
 * Auth0ComponentContext
 *
 * React Context that provides:
 * - Configuration for Auth0 integration including i18n and theming
 * - Authentication details (in SPA mode)
 *
 * This context is accessible by any component in the tree to consume auth and config state.
 */
export const Auth0ComponentContext = React.createContext<{
  config: Auth0ComponentConfig & {
    authDetails?: AuthDetails;
    isProxyMode: boolean;
    apiBaseUrl: string;
  };
}>({
  config: {
    i18n: { currentLanguage: 'en-US', fallbackLanguage: 'en-US' },
    themeSettings: { mode: 'light' },
    customOverrides: {},
    isProxyMode: false,
    apiBaseUrl: '',
  },
});

Auth0ComponentContext.displayName = 'Auth0ComponentContext';

/**
 * Auth0ComponentProvider
 *
 * Provides Auth0 configuration, internationalization (i18n), theming, and
 * authentication details (for SPA mode) to all components within the tree.
 *
 * It wraps children components with the ThemeProvider that manages branding
 * and customer theme overrides.
 *
 * @param children - React children that require access to Auth0 and theme context
 * @param authProxyUrl - Optional URL for proxy mode (RWA), where auth is handled externally
 * @param i18n - Internationalization configuration (language and fallback)
 * @param themeSettings - Branding theme settings, e.g., mode, colors, typography
 * @param customOverrides - Optional CSS variable overrides provided by the customer
 *
 * @example
 * ```tsx
 * <Auth0ComponentProvider
 *   authProxyUrl="/api/auth"
 *   i18n={{ currentLanguage: 'en', fallbackLanguage: 'en' }}
 *   themeSettings={{ mode: 'dark', primaryColor: '#005fcc' }}
 *   customerOverrides={{ '--font-size': '16px' }}
 * >
 *   <App />
 * </Auth0ComponentProvider>
 * ```
 */
export const Auth0ComponentProvider = React.memo(function Auth0ComponentProvider({
  children,
  authProxyUrl,
  i18n = { currentLanguage: 'en-US', fallbackLanguage: 'en-US' },
  themeSettings = { mode: 'light' },
  customOverrides = {},
}: Auth0ComponentConfig & { children: React.ReactNode }) {
  const isProxyMode = Boolean(authProxyUrl);

  // State to store authentication details and status
  const [authDetails, setAuthDetails] = React.useState<AuthDetails>({
    accessToken: undefined,
    domain: null,
    clientId: null,
    scopes: undefined,
    loading: !isProxyMode,
    error: undefined,
  });

  // Effect to fetch Auth0 details in SPA mode (non-proxy)
  React.useEffect(() => {
    if (isProxyMode) {
      // Proxy mode: auth handled externally, no need to fetch
      setAuthDetails((prev) => ({ ...prev, loading: false }));
      return;
    }

    const fetchAuth = async () => {
      try {
        const { useAuth0 } = await import('@auth0/auth0-react');
        const auth0 = useAuth0();

        const claims = await auth0.getIdTokenClaims();
        if (!claims) {
          setAuthDetails((prev) => ({ ...prev, loading: false }));
          return;
        }

        const tokenRes = await auth0.getAccessTokenSilently({
          cacheMode: 'off',
          detailedResponse: true,
        });

        setAuthDetails({
          accessToken: tokenRes.access_token ?? null,
          domain: claims.iss ?? null,
          clientId: claims.aud ?? null,
          scopes: tokenRes.scope,
          loading: false,
          error: undefined,
        });
      } catch (err) {
        setAuthDetails({
          accessToken: undefined,
          domain: null,
          clientId: null,
          scopes: undefined,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      }
    };

    fetchAuth();
  }, [isProxyMode]);

  const apiBaseUrl = React.useMemo(() => {
    if (isProxyMode) return authProxyUrl ?? '';
    return authDetails.domain ?? '';
  }, [isProxyMode, authProxyUrl, authDetails.domain]);

  // Memoize config to avoid unnecessary re-renders
  const config = React.useMemo(() => {
    const baseConfig = { i18n, themeSettings, customOverrides, isProxyMode, apiBaseUrl };
    return isProxyMode ? baseConfig : { ...baseConfig, authDetails };
  }, [isProxyMode, i18n, themeSettings, customOverrides, authDetails, apiBaseUrl]);

  return (
    <Auth0ComponentContext.Provider value={{ config }}>
      <ThemeProvider theme={{ branding: themeSettings, customOverrides }}>{children}</ThemeProvider>
    </Auth0ComponentContext.Provider>
  );
});

Auth0ComponentProvider.displayName = 'Auth0ComponentProvider';
