'use client';

import * as React from 'react';

import { Toaster } from '../components/ui/sonner';
import { Spinner } from '../components/ui/spinner';
import { CoreClientContext } from '../hooks/use-core-client';
import { useCoreClientInitialization } from '../hooks/use-core-client-initialization';
import { useToastProvider } from '../hooks/use-toast-provider';
import type { Auth0ComponentProviderProps } from '../types/auth-types';

import { ScopeManagerProvider } from './scope-manager-provider';
import { ThemeProvider } from './theme-provider';

/**
 * Auth0 Proxy Provider for Next.js and server-side authentication
 *
 * Use this when you have a backend proxy that handles Auth0 authentication.
 *
 * Toast Configuration Options:
 * 1. Default Sonner: No configuration needed
 * 2. Custom Library: Use renderToastProvider for complete control
 *
 * @example
 * ```tsx
 * // Default Sonner toasts
 * <Auth0ProxyProvider>
 *   <App />
 * </Auth0ProxyProvider>
 *
 * // Chakra UI toasts
 * <Auth0ProxyProvider
 *   toastSettings={{
 *     provider: 'custom',
 *     customMethods: { success: toast.success, error: toast.error },
 *     renderToastProvider: (children) => (
 *       <ChakraProvider>
 *         {children}
 *       </ChakraProvider>
 *     )
 *   }}
 * >
 *   <App />
 * </Auth0ProxyProvider>
 *
 * // React Hot Toast
 * <Auth0ProxyProvider
 *   toastSettings={{
 *     provider: 'custom',
 *     customMethods: { success: toast.success, error: toast.error },
 *     renderToastProvider: (children) => (
 *       <>
 *         {children}
 *         <Toaster position="top-right" />
 *       </>
 *     )
 *   }}
 * >
 *   <App />
 * </Auth0ProxyProvider>
 * ```
 */
export const Auth0ComponentProvider = ({
  i18n,
  authDetails,
  themeSettings = {
    theme: 'default',
    mode: 'light',
    variables: {
      common: {},
      light: {},
      dark: {},
    },
  },
  toastSettings,
  loader,
  children,
}: Auth0ComponentProviderProps & { children: React.ReactNode }) => {
  // Use custom hook to handle toast configuration
  const mergedToastSettings = useToastProvider(toastSettings);

  const memoizedAuthDetails = React.useMemo(
    () => ({
      ...authDetails,
      contextInterface: undefined,
    }),
    [authDetails],
  );

  const coreClient = useCoreClientInitialization({
    authDetails: memoizedAuthDetails,
    i18nOptions: i18n,
  });

  const coreClientValue = React.useMemo(
    () => ({
      coreClient,
    }),
    [coreClient],
  );

  // Memoize theme settings
  const memoizedThemeSettings = React.useMemo(
    () => ({
      mode: themeSettings.mode,
      variables: themeSettings.variables,
      loader,
      theme: themeSettings.theme,
    }),
    [themeSettings.mode, themeSettings.variables, themeSettings.theme, loader],
  );

  // Core app content
  const appContent = (
    <ThemeProvider themeSettings={memoizedThemeSettings}>
      {/* Default Sonner support - only render when no custom provider and using sonner */}
      {!mergedToastSettings.renderToastProvider && mergedToastSettings.provider === 'sonner' && (
        <Toaster position={mergedToastSettings.position} />
      )}

      <React.Suspense
        fallback={
          loader || (
            <div className="flex items-center justify-center min-h-[200px]">
              <Spinner />
            </div>
          )
        }
      >
        <CoreClientContext.Provider value={coreClientValue}>
          <ScopeManagerProvider>{children}</ScopeManagerProvider>
        </CoreClientContext.Provider>
      </React.Suspense>
    </ThemeProvider>
  );

  // If user provided custom render function, use it
  if (mergedToastSettings.renderToastProvider) {
    return <>{mergedToastSettings.renderToastProvider(appContent)}</>;
  }

  // Otherwise, render normally with default Sonner support
  return appContent;
};

export default Auth0ComponentProvider;
