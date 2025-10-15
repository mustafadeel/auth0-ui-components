function getClientBooleanEnvVar(name: string, defaultValue: boolean = false): boolean {
  // Client-side env vars must use NEXT_PUBLIC_ prefix
  // eslint-disable-next-line no-undef
  const value = process.env[name];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value === 'true' || value === '1';
}

export interface ClientConfig {
  enableMyAccount: boolean;
  enableMyOrg: boolean;
}

// Client-safe config - only exposes non-sensitive values
export const clientConfig: ClientConfig = {
  enableMyAccount: getClientBooleanEnvVar('VITE_ENABLE_MY_ACCOUNT'),
  enableMyOrg: getClientBooleanEnvVar('VITE_ENABLE_MY_ORG'),
};
