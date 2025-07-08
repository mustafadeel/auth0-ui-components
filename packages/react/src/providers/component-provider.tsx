'use client';

import * as React from 'react';
import type { Auth0ComponentProviderProps } from './types';
import { ProxyModeProvider } from './proxy-mode-provider';
import { I18nContext } from './i18n-provider';
import { CoreClientContext } from '@/hooks/use-core-client';
import { Spinner } from '@/components/ui/spinner';
import { useI18nInitialization } from '@/hooks/use-i18n-initialization';
import { useCoreClientInitialization } from '@/hooks/use-core-client-initialization';
import { AuthDetailsCore } from '@auth0-web-ui-components/core';

const SpaModeProvider = React.lazy(() => import('./spa-mode-provider'));

/**
 * Auth0ComponentProvider
 *
 * The main Auth0 context provider component that conditionally
 * renders either the Proxy Mode or SPA Mode provider based on the presence
 * of `authProxyUrl`.
 *
 * - **Proxy Mode:** Used when authentication is handled externally via a proxy server.
 * - **SPA Mode:** Used when authentication is handled client-side using the Auth0 SPA SDK.
 *
 * This component abstracts the complexity of choosing the correct mode from the end user.
 *
 * @param {Object} props - Configuration props.
 * @param {React.ReactNode} props.children - Child components that require authentication context.
 * @param {Object} [props.i18n] - Internationalization configuration (language, fallback).
 * @param {Object} [props.themeSettings] - Theme and branding settings.
 * @param {Object} [props.customOverrides] - Optional CSS variable overrides for styling.
 * @param {React.ReactNode} [props.loader] - Custom loading component to show while
 *                                                    authentication is initializing.
 *                                                    Defaults to "Loading authentication...".
 *
 * @returns {JSX.Element} The provider component for Auth0 context.
 *
 * @example
 * ```tsx
 * <Auth0ComponentProvider
 *   authProxyUrl="/api/auth"
 *   i18n={{ currentLanguage: 'en', fallbackLanguage: 'en' }}
 *   themeSettings={{ mode: 'dark' }}
 * >
 *   <App />
 * </Auth0ComponentProvider>
 * ```
 */
export const Auth0ComponentProvider = ({
  i18n,
  authDetails,
  ...props
}: Auth0ComponentProviderProps & { children: React.ReactNode }) => {
  const isProxyMode = Boolean(authDetails.authProxyUrl);

  // Add default values if not provided
  const authDetailsCore: AuthDetailsCore = {
    clientId: authDetails.clientId,
    domain: authDetails.domain,
    accessToken: authDetails.accessToken ?? undefined,
    scopes: authDetails.scopes ?? undefined,
    authProxyUrl: authDetails.authProxyUrl ?? undefined,
    contextInterface: authDetails.contextInterface,
  };

  // Initialize i18n
  const i18nState = useI18nInitialization(i18n);

  // Initialize CoreClient
  const coreClient = useCoreClientInitialization({
    authDetails: authDetailsCore,
    translator: i18nState.translator,
    i18nInitialized: i18nState.initialized,
  });

  const i18nValue = React.useMemo(
    () => ({
      translator: i18nState.translator,
      initialized: i18nState.initialized,
    }),
    [i18nState.translator, i18nState.initialized],
  );

  const coreClientValue = React.useMemo(
    () => ({
      coreClient,
    }),
    [coreClient],
  );

  return (
    <CoreClientContext.Provider value={coreClientValue}>
      <I18nContext.Provider value={i18nValue}>
        {isProxyMode ? (
          <ProxyModeProvider {...props} />
        ) : (
          <React.Suspense fallback={props.loader || <Spinner />}>
            <SpaModeProvider {...props} />
          </React.Suspense>
        )}
      </I18nContext.Provider>
    </CoreClientContext.Provider>
  );
};
