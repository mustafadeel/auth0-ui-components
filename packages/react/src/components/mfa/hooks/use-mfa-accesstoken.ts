import { useAccessToken, useComponentConfig } from '@/hooks';

/**
 * useMfaAccessToken
 *
 * Hook to obtain the MFA access token based on the global authentication configuration.
 *
 * ## Requirements
 * - Must be used within an Auth0ComponentProvider to access component config.
 * - `authDetails` and `isProxyMode` must be available from the component config.
 * - `useAccessToken` hook must be implemented and accessible.
 *
 * ## Features
 * - Automatically detects if running in RWA (Remote Web Access) mode, in which case no token is required.
 * - Checks if all required MFA scopes are present in `authDetails.scopes`.
 * - If all required scopes are present, returns the access token directly from `authDetails`.
 * - If any scopes are missing, falls back to calling `useAccessToken` to fetch a token with the required scopes.
 * - Returns token, loading status, and error state.
 *
 * @returns {{
 *   accessToken: string | undefined;
 *   loading: boolean;
 *   error: Error | null;
 * }}
 * @example
 * function MfaComponent() {
 *   const { accessToken, loading, error } = useMfaAccessToken();
 *
 *   if (loading) return <p>Loading token...</p>;
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return <p>Access Token: {accessToken ?? 'No token found'}</p>;
 * }
 *
 */
export function useMfaAccessToken() {
  const {
    config: { authDetails, isProxyMode },
  } = useComponentConfig();

  if (isProxyMode) {
    return { accessToken: undefined, loading: false, error: null };
  }

  const mfaScopes = ['read:authenticators', 'remove:authenticators', 'enroll'];
  const scopesString = authDetails?.scopes ?? '';
  const availableScopes = new Set(scopesString.split(' '));
  const hasAllScopes = mfaScopes.every((scope) => availableScopes.has(scope));

  if (hasAllScopes) {
    return { accessToken: authDetails?.accessToken ?? undefined, loading: false, error: null };
  }

  const { token, loading, error } = useAccessToken(mfaScopes.join(' '), 'mfa');
  return { accessToken: token ?? undefined, loading, error };
}
