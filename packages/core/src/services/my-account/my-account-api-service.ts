import { MyAccountClient, type MyAccountClientOptions } from '@auth0/myaccount';
import type { BaseCoreClientInterface, MyAccountAPIServiceInterface } from '@core/auth/auth-types';

import { createMFAController } from './mfa';
import { MY_ACCOUNT_SCOPES } from './my-account-api-constants';

/**
 * Creates a configured MyOrgClient instance using user-based authentication
 */
async function createMyAccountClient(
  coreClient: BaseCoreClientInterface,
): Promise<MyAccountClient> {
  const audiencePath = 'me';
  const token = await coreClient.getToken(MY_ACCOUNT_SCOPES, audiencePath);
  const clientOptions: MyAccountClientOptions = {
    domain: coreClient.auth.domain,
    token: token || '',
  };

  return new MyAccountClient(clientOptions);
}

/**
 * Creates an Authentication API service instance with access to various authentication operations.
 *
 * @param coreClient - The core client instance that provides authentication context and token management
 * @returns An authentication API service interface with MFA controller
 *
 * @example
 * ```typescript
 * const coreClient = await createCoreClient(authDetails);
 * const authService = createAuthenticationAPIService(coreClient);
 *
 * // Use MFA operations
 * const factors = await authService.mfa.fetchFactors();
 * ```
 */
export async function createMyAccountAPIService(
  coreClient: BaseCoreClientInterface,
): Promise<MyAccountAPIServiceInterface> {
  let myAccountClient: MyAccountClient | undefined;

  if (!coreClient.isProxyMode()) {
    myAccountClient = await createMyAccountClient(coreClient);
  }

  return {
    mfa: createMFAController(coreClient, myAccountClient),
  };
}
