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
export interface Authenticator {
  id: string;
  authenticator_type: MFAType;
  oob_channels?: string[];
  name?: string;
  active: boolean;
}

export type MFAType =
  | 'sms'
  | 'push-notification'
  | 'otp'
  | 'email'
  | 'duo'
  | 'webauthn-roaming'
  | 'webauthn-platform'
  | 'recovery-code';
