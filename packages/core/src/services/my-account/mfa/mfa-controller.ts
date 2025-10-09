import type { MyAccountClient } from '@auth0/myaccount';
import type { BaseCoreClientInterface } from '@core/auth/auth-types';

import {
  fetchMfaFactors,
  enrollMfaRequest,
  deleteMfaFactor,
  confirmMfaEnrollmentRequest,
} from './mfa-service';
import type {
  CreateAuthenticationMethodResponseContent,
  VerifyAuthenticationMethodRequestContent,
  VerifyAuthenticationMethodResponseContent,
  PathAuthenticationMethodId,
  MFAType,
  EnrollOptions,
  ConfirmEnrollmentOptions,
  MFAControllerInterface,
  Authenticator,
} from './mfa-types';
import { buildEnrollParams, transformMyAccountFactors } from './mfa-utils';

const MFAUtils = {
  async fetchFactors(
    coreClient: BaseCoreClientInterface,
    myAccountClient?: MyAccountClient,
    onlyActive: boolean = false,
  ): Promise<Record<MFAType, Authenticator[]>> {
    if (!coreClient.isProxyMode()) {
      if (!myAccountClient) {
        throw new Error('MyAccountClient is required for non-proxy mode');
      }

      try {
        const [availableFactorsResponse, enrolledFactorsResponse] = await Promise.all([
          myAccountClient.factors.list(),
          myAccountClient.authenticationMethods.list(),
        ]);

        return transformMyAccountFactors(
          availableFactorsResponse,
          enrolledFactorsResponse,
          onlyActive,
        ) as Record<MFAType, Authenticator[]>;
      } catch (error) {
        throw new Error(
          `Unable to retrieve MFA factors: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    const baseUrl = coreClient.getApiBaseUrl();
    return (await fetchMfaFactors(baseUrl, onlyActive)) as Record<MFAType, Authenticator[]>;
  },

  async enrollFactor(
    coreClient: BaseCoreClientInterface,
    myAccountClient: MyAccountClient | undefined,
    factorType: MFAType,
    options: EnrollOptions = {},
  ): Promise<CreateAuthenticationMethodResponseContent> {
    if (!coreClient.isProxyMode()) {
      if (!myAccountClient) {
        throw new Error('MyAccountClient is required for non-proxy mode');
      }

      try {
        const params = buildEnrollParams(factorType, options);
        return await myAccountClient.authenticationMethods.create(params);
      } catch (error) {
        throw new Error(
          `Unable to enroll MFA factor: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    const baseUrl = coreClient.getApiBaseUrl();
    const params = buildEnrollParams(factorType, options);
    return enrollMfaRequest(baseUrl, params);
  },

  async deleteFactor(
    coreClient: BaseCoreClientInterface,
    myAccountClient: MyAccountClient | undefined,
    authenticationMethodId: PathAuthenticationMethodId,
  ): Promise<void> {
    if (!coreClient.isProxyMode()) {
      if (!myAccountClient) {
        throw new Error('MyAccountClient is required for non-proxy mode');
      }

      try {
        return await myAccountClient.authenticationMethods.delete(authenticationMethodId);
      } catch (error) {
        throw new Error(
          `Unable to enroll MFA factor: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    const baseUrl = coreClient.getApiBaseUrl();
    return deleteMfaFactor(baseUrl, authenticationMethodId);
  },

  async confirmEnrollment(
    coreClient: BaseCoreClientInterface,
    myAccountClient: MyAccountClient | undefined,
    factorType: MFAType,
    authSession: string,
    authenticationMethodId: string,
    options: ConfirmEnrollmentOptions,
  ): Promise<VerifyAuthenticationMethodResponseContent> {
    if (!coreClient.isProxyMode()) {
      if (!myAccountClient) {
        throw new Error('MyAccountClient is required for non-proxy mode');
      }

      try {
        const baseParams = { auth_session: authSession };
        const params: VerifyAuthenticationMethodRequestContent =
          ['totp', 'phone', 'email'].includes(factorType) && options.userOtpCode?.trim()
            ? { ...baseParams, otp_code: options.userOtpCode.trim() }
            : baseParams;

        return await myAccountClient.authenticationMethods.verify(authenticationMethodId, params);
      } catch (error) {
        throw new Error(
          `Unable to verify MFA factor: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    const baseUrl = coreClient.getApiBaseUrl();
    const baseParams = { authentication_method_id: authenticationMethodId };
    const params =
      ['totp', 'phone', 'email'].includes(factorType) && options.userOtpCode?.trim()
        ? { ...baseParams, otp_code: options.userOtpCode.trim() }
        : baseParams;

    return confirmMfaEnrollmentRequest(baseUrl, params);
  },
};

export function createMFAController(
  coreClient: BaseCoreClientInterface,
  myAccountClient?: MyAccountClient,
): MFAControllerInterface {
  return {
    async fetchFactors(onlyActive: boolean = false): Promise<unknown> {
      return MFAUtils.fetchFactors(coreClient, myAccountClient, onlyActive);
    },

    async enrollFactor(
      factorType: MFAType,
      options: EnrollOptions = {},
    ): Promise<CreateAuthenticationMethodResponseContent> {
      return MFAUtils.enrollFactor(coreClient, myAccountClient, factorType, options);
    },

    async deleteFactor(authenticatorId: PathAuthenticationMethodId): Promise<void> {
      return MFAUtils.deleteFactor(coreClient, myAccountClient, authenticatorId);
    },

    async confirmEnrollment(
      factorType: MFAType,
      authSession: string,
      authenticationMethodId: PathAuthenticationMethodId,
      options: ConfirmEnrollmentOptions,
    ): Promise<VerifyAuthenticationMethodResponseContent> {
      return MFAUtils.confirmEnrollment(
        coreClient,
        myAccountClient,
        factorType,
        authSession,
        authenticationMethodId,
        options,
      );
    },
  };
}
