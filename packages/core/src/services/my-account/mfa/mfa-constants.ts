export const FACTOR_TYPE_EMAIL = 'email';
export const FACTOR_TYPE_PHONE = 'phone';
export const FACTOR_TYPE_PUSH_NOTIFICATION = 'push-notification';
export const FACTOR_TYPE_TOTP = 'totp';
export const FACTOR_TYPE_RECOVERY_CODE = 'recovery-code';
export const FACTOR_TYPE_WEBAUTHN_ROAMING = 'webauthn-roaming';
export const FACTOR_TYPE_WEBAUTHN_PLATFORM = 'webauthn-platform';

/**
 * Array of all supported MFA factor types for validation and iteration
 */
export const SUPPORTED_FACTOR_TYPES = [
  FACTOR_TYPE_EMAIL,
  FACTOR_TYPE_PHONE,
  FACTOR_TYPE_PUSH_NOTIFICATION,
  FACTOR_TYPE_TOTP,
  FACTOR_TYPE_RECOVERY_CODE,
  FACTOR_TYPE_WEBAUTHN_PLATFORM,
] as const;
