import { createMyAccountAPIService } from '@core/services/my-account/my-account-api-service';
import { createMyOrgAPIService } from '@core/services/my-org/my-org-api-service';

import type { I18nInitOptions } from '../i18n';
import { createI18nService } from '../i18n';

import type {
  AuthDetailsCore,
  BaseCoreClientInterface,
  CoreClientInterface,
  ServicesConfig,
  MyAccountAPIServiceInterface,
  MyOrgAPIServiceInterface,
} from './auth-types';
import { AuthUtils } from './auth-utils';
import { createTokenManager } from './token-manager';

/**
 * Gets the base URL for API calls, supporting both direct Auth0 domain and proxy mode.
 */
function getApiBaseUrl(auth: AuthDetailsCore): string {
  // Use authProxyUrl if provided (proxy mode)
  if (auth.authProxyUrl) {
    return auth.authProxyUrl.endsWith('/') ? auth.authProxyUrl : `${auth.authProxyUrl}/`;
  }

  const domain = auth.domain;
  if (!domain) {
    throw new Error('getApiBaseUrl: Auth0 domain is not configured');
  }
  return AuthUtils.toURL(domain);
}

/**
 * Determines if the client is running in proxy mode by checking for authProxyUrl.
 */
function isProxyMode(auth: AuthDetailsCore): boolean {
  return !!auth.authProxyUrl;
}

/**
 * Initializes services configuration from auth details with proper defaults.
 */
function initializeServicesConfig(authDetails: AuthDetailsCore): ServicesConfig {
  return {
    myAccount: { enabled: authDetails.servicesConfig.myAccount.enabled ?? false },
    myOrg: { enabled: authDetails.servicesConfig.myOrg.enabled ?? false },
  };
}

/**
 * Initializes authentication details by attempting to get an access token if a context interface is available and is not proxy mode.
 */
async function initializeAuthDetails(authDetails: AuthDetailsCore): Promise<AuthDetailsCore> {
  const authDetailsWithServices = {
    ...authDetails,
    servicesConfig: initializeServicesConfig(authDetails),
  };

  if (isProxyMode(authDetails)) {
    return authDetailsWithServices;
  }

  if (authDetailsWithServices.contextInterface) {
    try {
      const tokenRes = await authDetailsWithServices.contextInterface.getAccessTokenSilently({
        cacheMode: 'off',
        detailedResponse: true,
      });
      return {
        ...authDetailsWithServices,
        accessToken: tokenRes.access_token,
      };
    } catch (err) {
      return {
        ...authDetailsWithServices,
        accessToken: undefined,
      };
    }
  }
  return authDetailsWithServices;
}

/**
 * Initializes API services based on configuration and authentication state.
 */
async function initializeServices(baseCoreClient: BaseCoreClientInterface) {
  const { servicesConfig, contextInterface } = baseCoreClient.auth;
  const isProxy = baseCoreClient.isProxyMode();
  const services: {
    myAccountApiService?: MyAccountAPIServiceInterface;
    myOrgApiService?: MyOrgAPIServiceInterface;
  } = {};
  const errors: string[] = [];

  // Initialize MyAccount API service
  if (servicesConfig.myAccount.enabled && (isProxy || contextInterface?.isAuthenticated)) {
    try {
      services.myAccountApiService = await createMyAccountAPIService(baseCoreClient);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`MyAccount service: ${message}`);
    }
  }

  // Initialize MyOrg API service
  if (servicesConfig.myOrg.enabled && (isProxy || contextInterface?.isAuthenticated)) {
    try {
      services.myOrgApiService = await createMyOrgAPIService(baseCoreClient);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`MyOrg service: ${message}`);
    }
  }

  const enabledCount =
    (servicesConfig.myAccount.enabled ? 1 : 0) + (servicesConfig.myOrg.enabled ? 1 : 0);

  if (enabledCount > 0 && errors.length === enabledCount) {
    const formattedErrors = errors.map((error, index) => `  ${index + 1}. ${error}`).join('\n');

    throw new Error(
      `Service initialization failed:\n\n${formattedErrors}\n\nPlease check your configuration and network connectivity.`,
    );
  }

  return services;
}

/**
 * Creates a core client instance that serves as the foundation for authentication and other main operations.
 *
 * This factory function initializes all core services including i18n, token management,
 * and other API services. It handles both direct Auth0 integration and proxy mode.
 *
 * @param authDetails - Authentication configuration including domain, and optional proxy settings
 * @param i18nOptions - Optional internationalization configuration for language support
 * @returns Promise resolving to a fully initialized core client interface
 *
 * @example
 * ```typescript
 * // Direct Auth0 integration
 * const coreClient = await createCoreClient({
 *   domain: 'your-domain.auth0.com',
 *   contextInterface: auth0Client
 * });
 *
 * // Proxy mode
 * const coreClient = await createCoreClient({
 *   authProxyUrl: 'https://your-proxy.com/api',
 * });
 * ```
 */
export async function createCoreClient(
  authDetails: AuthDetailsCore,
  i18nOptions?: I18nInitOptions,
): Promise<CoreClientInterface> {
  const [i18nService, auth] = await Promise.all([
    createI18nService(
      i18nOptions || {
        currentLanguage: 'en-US',
        fallbackLanguage: 'en-US',
      },
    ),
    initializeAuthDetails(authDetails),
  ]);

  // Initialize token manager service
  const tokenManagerService = createTokenManager(auth);

  // Return the complete object with functional core
  const baseCoreClient: BaseCoreClientInterface = {
    auth,
    i18nService,

    async getToken(scope: string, audiencePath: string, ignoreCache = false) {
      return tokenManagerService.getToken(scope, audiencePath, ignoreCache);
    },

    getApiBaseUrl(): string {
      return getApiBaseUrl(auth);
    },

    isProxyMode(): boolean {
      return isProxyMode(auth);
    },
  };

  const { myAccountApiService, myOrgApiService } = await initializeServices(baseCoreClient);

  const coreClient: CoreClientInterface = {
    ...baseCoreClient,
    myAccountApiService,
    myOrgApiService,
    getMyAccountApiService: () => {
      if (!myAccountApiService) {
        throw new Error(
          'myAccountApiService is not enabled. Please use it within Auth0ComponentProvider.',
        );
      }
      return myAccountApiService;
    },
    getMyOrgApiService: () => {
      if (!myOrgApiService) {
        throw new Error(
          'myOrgApiService is not enabled. Please use it within Auth0ComponentProvider and make sure the user is in the context of an Auth0 Organization.',
        );
      }
      return myOrgApiService;
    },
  };

  return coreClient;
}
