import { CoreClientInterface } from '../auth/auth-types';
import { createMFAController } from './mfa/mfa-controller';

// Pure utility functions for authentication API operations
export const AuthApiUtils = {
  /**
   * Create MFA controller with core client
   */
  createMfaController(coreClient: CoreClientInterface) {
    return createMFAController(coreClient);
  },
};

// Functional factory for authentication service
export function createAuthenticationAPIService(coreClient: CoreClientInterface) {
  return {
    mfa: AuthApiUtils.createMfaController(coreClient),
  };
}
