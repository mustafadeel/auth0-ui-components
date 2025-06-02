/**
 * Metadata describing an MFA factor type.
 * @property {string} title - Display title of the factor.
 * @property {string} description - Description of the factor.
 */
export interface FactorMeta {
  title: string;
  description: string;
}

/**
 * Represents an MFA authenticator linked to a user.
 * @property {string} id - Unique identifier of the authenticator.
 * @property {string} authenticator_type - Type of the authenticator.
 * @property {string[]} [oob_channels] - Optional out-of-band channels supported.
 * @property {string} [name] - Optional name of the authenticator.
 * @property {boolean} active - Whether the authenticator is active.
 */
export interface Authenticator extends FactorMeta {
  id: string;
  authenticator_type: string;
  oob_channels?: string[];
  name?: string;
  active: boolean;
}

/**
 * Result returned by the `useMfaList` hook.
 * @property {boolean} loading - Indicates if the fetch request is in progress.
 * @property {Error | null} error - Error encountered during fetching, or null.
 * @property {(Authenticator & FactorMeta)[]} factors - List of authenticators enriched with metadata.
 */
export interface UseMfaListResult {
  loading: boolean;
  error: Error | null;
  factors: (Authenticator & FactorMeta)[];
}

/**
 * Result returned by the `useDeleteMfa` hook.
 * @property {boolean} loading - Indicates if the delete operation is in progress.
 * @property {Error} [error] - Error encountered during deletion, if any.
 * @property {boolean} success - Indicates if the deletion was successful.
 */
export interface DeleteMfaResult {
  loading: boolean;
  error?: Error;
  success: boolean;
}

/**
 * Parameters required to enroll (associate) a new MFA authenticator.
 *
 * @property {string} client_id - Your Auth0 application Client ID.
 * @property {('otp' | 'oob')[]} authenticator_types - Types of authenticators to enroll.
 * @property {('auth0' | 'sms' | 'voice')[]} [oob_channels] - Out-of-band channels, required if `authenticator_types` includes 'oob'.
 * @property {string} [phone_number] - Phone number used for SMS or voice channel; required if `oob_channels` includes 'sms' or 'voice'.
 */
export interface EnrollMfaParams {
  client_id: string;
  authenticator_types: ('otp' | 'oob')[];
  oob_channels?: ('auth0' | 'sms' | 'voice')[];
  phone_number?: string;
}

/**
 * Response returned after enrolling an MFA authenticator.
 *
 * @property {Record<string, any>} authenticator - Details of the enrolled authenticator.
 * @property {Record<string, any>} challenge - Challenge information to continue MFA verification.
 * @property {string[]} [recovery_codes] - Recovery codes provided on first enrollment.
 */
export interface EnrollMfaResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticator: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  challenge: Record<string, any>;
  recovery_codes?: string[];
}

/**
 * Result object returned by the `useEnrollMfa` hook.
 *
 * @property {boolean} loading - True if enrollment request is in progress.
 * @property {Error | null} error - Error encountered during enrollment, if any.
 * @property {EnrollMfaResponse | null} response - Response data from enrollment endpoint.
 * @property {(params: EnrollMfaParams, mfaToken?: string) => Promise<void>} enrollMfa - Function to initiate MFA enrollment.
 */
export interface UseEnrollMfaResult {
  loading: boolean;
  error: Error | null;
  response: EnrollMfaResponse | null;
  enrollMfa: (params: EnrollMfaParams, mfaToken?: string) => Promise<void>;
}

/**
 * Parameters required to verify an MFA recovery code.
 *
 * @property {string} mfaToken - The MFA token received from the `mfa_required` error.
 * @property {string} recoveryCode - The recovery code provided by the user.
 */
export interface VerifyMfaRecoveryCodeParams {
  mfaToken: string;
  recoveryCode: string;
}

/**
 * Result returned by the `useVerifyMfaRecoveryCode` hook.
 *
 * @property {boolean} loading - Indicates whether the verification request is in progress.
 * @property {Error | null} error - Contains any error that occurred during verification, or null if none.
 * @property {any | null} data - The token response from Auth0 if the recovery code was successfully verified.
 * @property {(params: VerifyMfaRecoveryCodeParams) => Promise<void>} verifyRecoveryCode - Function to initiate the recovery code verification.
 */
export interface VerifyMfaRecoveryCodeResult {
  loading: boolean;
  error: Error | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null; // Contains the access_token, id_token, etc. from the response
  verifyRecoveryCode: (params: VerifyMfaRecoveryCodeParams) => Promise<void>;
}
