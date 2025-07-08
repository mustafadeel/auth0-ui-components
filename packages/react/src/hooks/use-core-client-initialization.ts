import * as React from 'react';
import type { TFactory, CoreClientInterface, AuthDetailsCore } from '@auth0-web-ui-components/core';
import { CoreClient } from '@auth0-web-ui-components/core';

interface UseCoreClientInitializationProps {
  authDetails: AuthDetailsCore;
  authProxyUrl?: string;
  translator?: TFactory;
  i18nInitialized: boolean;
}

/**
 * Custom hook to handle CoreClient initialization
 */
export const useCoreClientInitialization = ({
  authDetails,
  authProxyUrl,
  translator,
  i18nInitialized,
}: UseCoreClientInitializationProps) => {
  const [coreClient, setCoreClient] = React.useState<CoreClientInterface | null>(null);

  React.useEffect(() => {
    if (!i18nInitialized) {
      return;
    }

    const initializeCoreClient = async () => {
      try {
        // Combine authDetails with authProxyUrl
        const authDetailsWithProxy = {
          ...authDetails,
          authProxyUrl,
        };

        const initializedCoreClient = await CoreClient.create(authDetailsWithProxy, translator);

        setCoreClient(initializedCoreClient);
      } catch (error) {
        console.error('Failed to initialize CoreClient:', error);
        setCoreClient(null);
      }
    };

    initializeCoreClient();
  }, [
    i18nInitialized,
    translator,
    authProxyUrl,
    authDetails.contextInterface?.getAccessTokenSilently,
    authDetails.contextInterface?.getIdTokenClaims,
  ]);

  return coreClient;
};
