import * as React from 'react';
import { useComponentConfig } from '@/hooks';
import type { DeleteMfaResult } from './types';
import { deleteMfaFactor } from '@auth0-web-ui-components/core';

/**
 * useDeleteMfa
 *
 * Custom hook to delete an MFA authenticator by its ID.
 *
 * ## Requirements:
 * - Must be used within an Auth0ComponentProvider.
 * - In SPA mode:
 *   - Auth0 access token with `remove:authenticators` scope
 *   - Auth0 domain information
 * - In RWA mode (when `authProxyUrl` is configured):
 *   - Access token and domain are optional (requests are proxied)
 *
 * ## Features:
 * - Supports both traditional SPAs and resource web apps (RWA).
 * - Manages loading, success, and error states for the delete operation.
 * - Throws detailed errors for insufficient scopes, missing tokens, and API failures.
 *
 * @param accessToken Optional access token to authorize the delete request (required in SPA mode).
 * @returns {Object} - The state and deleteMfa function:
 *   - loading: boolean indicating request progress
 *   - error: Error object if an error occurred
 *   - success: boolean indicating successful deletion
 *   - deleteMfa: function accepting authenticator ID to trigger deletion
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useDeleteMfa } from './useDeleteMfa';
 *
 * function DeleteAuthenticatorButton({ id }: { id: string }) {
 *   const { loading, error, success, deleteMfa } = useDeleteMfa(accessToken);
 *
 *   return (
 *     <div>
 *       <button onClick={() => deleteMfa(id)} disabled={loading}>
 *         Delete Authenticator
 *       </button>
 *       {loading && <p>Deleting...</p>}
 *       {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
 *       {success && <p>Deleted successfully!</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDeleteMfa(accessToken?: string) {
  const {
    config: { authDetails, apiBaseUrl, isProxyMode },
  } = useComponentConfig();

  const [state, setState] = React.useState<DeleteMfaResult>({
    loading: false,
    error: undefined,
    success: false,
  });

  const deleteMfa = React.useCallback(
    async (authenticatorId: string) => {
      setState({ loading: true, error: undefined, success: false });

      try {
        if (!isProxyMode) {
          if (!accessToken) throw new Error('Access token is required.');
          if (!authDetails?.domain) throw new Error('Auth0 domain is missing.');
        }

        if (!apiBaseUrl) throw new Error('Missing API base URL.');

        await deleteMfaFactor(apiBaseUrl, authenticatorId, isProxyMode ? undefined : accessToken);
        // If we reach here, deletion was successful
        setState((prev) => ({ ...prev, success: true }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error(String(error)),
          success: false,
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [apiBaseUrl, isProxyMode, authDetails, accessToken],
  );

  return { ...state, deleteMfa };
}
