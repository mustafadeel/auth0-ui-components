import type {
  MFAType,
  EnrollOptions,
  ConfirmEnrollmentOptions,
} from '@auth0-web-ui-components/core';
import { useCallback } from 'react';

import type { UseMFAResult } from '../../../types/index';
import { useCoreClient } from '../../use-core-client';

/**
 * A custom React hook for managing all Multi-Factor Authentication (MFA) operations.
 * @returns {UseMfaResult} An object containing the functions to manage MFA factors.
 */
export function useMFA(): UseMFAResult {
  const { coreClient } = useCoreClient();

  if (!coreClient) {
    throw new Error(
      'useMFA must be used within Auth0ComponentProvider with initialized CoreClient',
    );
  }
  const fetchFactors = useCallback(
    (onlyActive = false) => coreClient.getMyAccountApiService().mfa.fetchFactors(onlyActive),
    [coreClient],
  );

  const enrollMfa = useCallback(
    (factorName: MFAType, options: EnrollOptions = {}) =>
      coreClient.getMyAccountApiService().mfa.enrollFactor(factorName, options),
    [coreClient],
  );

  const deleteMfa = useCallback(
    (authenticatorId: string) =>
      coreClient.getMyAccountApiService().mfa.deleteFactor(authenticatorId),
    [coreClient],
  );

  const confirmEnrollment = useCallback(
    (
      factorType: MFAType,
      authSession: string,
      authenticationMethodId: string,
      options: ConfirmEnrollmentOptions,
    ) =>
      coreClient
        .getMyAccountApiService()
        .mfa.confirmEnrollment(factorType, authSession, authenticationMethodId, options),
    [coreClient],
  );

  return {
    fetchFactors,
    enrollMfa,
    deleteMfa,
    confirmEnrollment,
  };
}
