'use client';

import { Auth0ComponentProvider } from '@auth0-web-ui-components/react';
import React from 'react';

import { clientConfig } from '../config/client';

import { I18nProvider } from './i18n-provider';

interface ClientProviderProps {
  children: React.ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  return (
    <I18nProvider>
      <Auth0ComponentProvider
        authDetails={{
          authProxyUrl: '/api', // Use the auth proxy base (For example, MFA service will add /mfa/authenticators)
          servicesConfig: {
            myAccount: {
              enabled: clientConfig.enableMyAccount,
            },
            myOrg: {
              enabled: clientConfig.enableMyOrg,
            },
          },
        }}
        themeSettings={{
          mode: 'light',
          theme: 'default',
        }}
      >
        {children}
      </Auth0ComponentProvider>
    </I18nProvider>
  );
}
