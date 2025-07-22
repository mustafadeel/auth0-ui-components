import { CoreClientInterface } from '../auth/auth-types';
import { createMFAController } from './mfa/mfa-controller';
import { MFAControllerInterface } from './mfa/mfa-types';

export interface AuthenticationAPIServiceInterface {
  mfa: MFAControllerInterface;
}

// Functional factory for authentication service
export function createAuthenticationAPIService(
  coreClient: CoreClientInterface,
): AuthenticationAPIServiceInterface {
  return {
    mfa: createMFAController(coreClient),
  };
}
