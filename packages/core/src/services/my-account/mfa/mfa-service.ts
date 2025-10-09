import { get, del, isApiError, post } from '../../../api';

import type {
  Authenticator,
  ListFactorsResponseContent,
  ListAuthenticationMethodsResponseContent,
  CreateAuthenticationMethodRequestContent,
  CreateAuthenticationMethodResponseContent,
  MFAType,
  VerifyAuthenticationMethodResponseContent,
} from './mfa-types';
import { transformMyAccountFactors } from './mfa-utils';

export const factorsMetaKeys = new Set(['otp', 'push-notification', 'sms', 'email']);

export async function fetchMfaFactors(
  baseUrl: string,
  onlyActive = false,
): Promise<Partial<Record<MFAType, Authenticator[]>>> {
  const availableFactorsFortheUser: ListFactorsResponseContent = await get(`${baseUrl}factors`);
  const factors: ListAuthenticationMethodsResponseContent = await get(
    `${baseUrl}authentication-methods`,
  );
  return transformMyAccountFactors(availableFactorsFortheUser, factors, onlyActive);
}

/**
 * Deletes an MFA authenticator by ID.
 *
 * @param baseUrl - The base API URL (e.g. Auth0 domain or proxy).
 * @param id - The authenticator ID to delete.
 * @param accessToken - Optional token (used in SPA mode).
 */
export async function deleteMfaFactor(baseUrl: string, id: string): Promise<void> {
  try {
    await del(`${baseUrl}authentication-methods/${id}`);
  } catch (err) {
    if (isApiError(err)) {
      switch (err.status) {
        case 401:
          throw new Error('Unauthorized: Invalid access token.');
        case 404:
          throw new Error('Authenticator not found.');
        default:
          throw new Error(`Delete failed: ${err.message}`);
      }
    }
    throw new Error('Unexpected error occurred while deleting MFA factor.');
  }
}

export async function enrollMfaRequest(
  baseUrl: string,
  params: CreateAuthenticationMethodRequestContent,
): Promise<CreateAuthenticationMethodResponseContent> {
  const url = `${baseUrl}authentication-methods`;
  return await post<CreateAuthenticationMethodResponseContent>(url, params);
}

/**
 * Performs the MFA confirmation API call.
 *
 * @param baseUrl - The base API URL (e.g. Auth0 domain or proxy).
 * @param data - Data needed to confirm MFA enrollment (depending on MFA type).
 * @param accessToken - Access token.
 * @returns Response from Auth0.
 */
export async function confirmMfaEnrollmentRequest(
  baseUrl: string,
  data: {
    otp_code?: string;
    authentication_method_id: string;
  },
): Promise<VerifyAuthenticationMethodResponseContent> {
  const url = `${baseUrl}verify`;

  return await post<VerifyAuthenticationMethodResponseContent>(url, data);
}
