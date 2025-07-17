import { CoreClientInterface } from '../../auth/auth-types';
import {
  fetchMfaFactors,
  enrollMfaRequest,
  deleteMfaFactor,
  confirmMfaEnrollmentRequest,
} from './mfa-service';
import { buildEnrollParams, buildConfirmParams } from './mfa-utils';
import type {
  Authenticator,
  EnrollMfaResponse,
  MFAType,
  EnrollOptions,
  ConfirmEnrollmentOptions,
  MFAControllerInterface,
} from './mfa-types';

/**
 * Pure functional utilities for MFA operations
 */
export const MFAUtils = {
  /**
   * Get access token for MFA operations
   */
  async getToken(
    coreClient: CoreClientInterface,
    ignoreCache: boolean = false,
  ): Promise<string | undefined> {
    return coreClient.getToken(
      'read:authenticators remove:authenticators enroll',
      'mfa',
      ignoreCache,
    );
  },

  /**
   * Fetch MFA factors for a user
   */
  async fetchFactors(
    coreClient: CoreClientInterface,
    onlyActive: boolean = false,
    ignoreCache: boolean = false,
  ): Promise<Authenticator[]> {
    const baseUrl = coreClient.getApiBaseUrl();
    const accessToken = await MFAUtils.getToken(coreClient, ignoreCache);
    return fetchMfaFactors(baseUrl, accessToken, onlyActive);
  },

  /**
   * Enroll a new MFA factor
   */
  async enrollFactor(
    coreClient: CoreClientInterface,
    factorName: MFAType,
    options: EnrollOptions = {},
    ignoreCache: boolean = false,
  ): Promise<EnrollMfaResponse> {
    const baseUrl = coreClient.getApiBaseUrl();
    const accessToken = await MFAUtils.getToken(coreClient, ignoreCache);
    const params = buildEnrollParams(factorName, options);
    return enrollMfaRequest(baseUrl, params, accessToken);
  },

  /**
   * Delete an MFA factor
   */
  async deleteFactor(
    coreClient: CoreClientInterface,
    authenticatorId: string,
    ignoreCache: boolean = false,
  ): Promise<void> {
    const baseUrl = coreClient.getApiBaseUrl();
    const accessToken = await MFAUtils.getToken(coreClient, ignoreCache);
    return deleteMfaFactor(baseUrl, authenticatorId, accessToken);
  },

  /**
   * Confirm MFA enrollment
   */
  async confirmEnrollment(
    coreClient: CoreClientInterface,
    factorName: MFAType,
    options: ConfirmEnrollmentOptions,
    ignoreCache: boolean = false,
  ): Promise<unknown> {
    const baseUrl = coreClient.getApiBaseUrl();
    const accessToken = await MFAUtils.getToken(coreClient, ignoreCache);
    const isProxyMode = coreClient.isProxyMode();
    const clientId = isProxyMode ? undefined : coreClient.auth.clientId;
    const params = buildConfirmParams(factorName, options, clientId, accessToken);
    return confirmMfaEnrollmentRequest(baseUrl, params, accessToken);
  },
};

/**
 * Factory function to create MFA controller interface
 */
export function createMFAController(coreClient: CoreClientInterface): MFAControllerInterface {
  return {
    async fetchFactors(
      onlyActive: boolean = false,
      ignoreCache: boolean = false,
    ): Promise<Authenticator[]> {
      return MFAUtils.fetchFactors(coreClient, onlyActive, ignoreCache);
    },

    async enrollFactor(
      factorName: MFAType,
      options: EnrollOptions = {},
      ignoreCache: boolean = false,
    ): Promise<EnrollMfaResponse> {
      return MFAUtils.enrollFactor(coreClient, factorName, options, ignoreCache);
    },

    async deleteFactor(authenticatorId: string, ignoreCache: boolean = false): Promise<void> {
      return MFAUtils.deleteFactor(coreClient, authenticatorId, ignoreCache);
    },

    async confirmEnrollment(
      factorName: MFAType,
      options: ConfirmEnrollmentOptions,
      ignoreCache: boolean = false,
    ): Promise<unknown> {
      return MFAUtils.confirmEnrollment(coreClient, factorName, options, ignoreCache);
    },
  };
}
