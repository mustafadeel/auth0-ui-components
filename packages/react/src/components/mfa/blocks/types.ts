/**
 * Represents the type of an MFA authenticator.
 *
 * Common values include:
 * - 'otp' (One-Time Password)
 * - 'oob' (Out-of-Band: SMS, email, push)
 * - 'webauthn' (Web Authentication: biometrics, security keys)
 * - 'push' (Push notification via Auth0 Guardian)
 * - 'sms' (SMS-based verification)
 * - 'email' (Email-based verification)
 */
export type MFAType = 'otp' | 'oob' | 'webauthn' | 'push' | 'sms' | 'email' | string;

/**
 * Represents an MFA authenticator linked to a user.
 */
export interface MFAFactor {
  id: string;
  authenticator_type: MFAType;
  oob_channels?: string[];
  name?: string;
  active: boolean;
  displayName?: string;
  description?: string;
  status?: string;
}

/**
 * Error object for MFA operations.
 * Extends the standard Error with optional code and additional details.
 */
export interface MFAError {
  message: string;
  code?: string;
}

export interface ManageMfaProps {
  localization?: MFALocalizationMap;
  showTitleDescription?: boolean;
  showActiveOnly?: boolean;
  disableEnroll?: boolean;
  disableDelete?: boolean;
  readOnly?: boolean;
  onEnroll?: () => void;
  onDelete?: () => void;
  onFetch?: () => void;
  onErrorAction?: (error: Error, action: 'enroll' | 'delete') => void;
  onBeforeAction?: (action: 'enroll' | 'delete', factorType: MFAType) => boolean | Promise<boolean>;
}

/**
 * Represents the localized content for a single language.
 */
export interface MFALocaleContent {
  title: string;
  description: string;
}

/**
 * A map of language codes (e.g., 'en', 'fr') to their respective localized content.
 */
export type MFALocalizationMap = Record<string, MFALocaleContent>;
