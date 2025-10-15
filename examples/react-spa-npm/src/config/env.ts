interface AppConfig {
  auth0: {
    domain: string;
    clientId: string;
    enableMyAccount: boolean;
    enableMyOrg: boolean;
  };
}

function getRequiredEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getBooleanEnvVar(name: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[name];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value === 'true' || value === '1';
}

export const config: AppConfig = {
  auth0: {
    domain: getRequiredEnvVar('VITE_AUTH0_DOMAIN'),
    clientId: getRequiredEnvVar('VITE_AUTH0_CLIENT_ID'),
    enableMyAccount: getBooleanEnvVar('VITE_ENABLE_MY_ACCOUNT'),
    enableMyOrg: getBooleanEnvVar('VITE_ENABLE_MY_ORG'),
  },
};
