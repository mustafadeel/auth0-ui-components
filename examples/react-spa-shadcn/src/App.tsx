import { Auth0Provider } from '@auth0/auth0-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Auth0ComponentProvider } from '@/auth0-ui-components/providers';

import { Routes, Route, BrowserRouter } from './components/RouterCompat';
import { config } from './config/env';
import Index from './pages/Index';
import ManageOrg from './pages/ManageOrg';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  const defaultAuthDetails = {
    clientId: config.auth0.clientId,
    domain: config.auth0.domain,
    servicesConfig: {
      myAccount: {
        enabled: config.auth0.enableMyAccount,
      },
      myOrg: {
        enabled: config.auth0.enableMyOrg,
      },
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipPrimitive.Provider>
        <BrowserRouter>
          <Auth0Provider
            domain={config.auth0.domain}
            clientId={config.auth0.clientId}
            authorizationParams={{ redirect_uri: window.location.origin }}
          >
            <Auth0ComponentProvider
              authDetails={defaultAuthDetails}
              i18n={{ currentLanguage: i18n.language }}
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/manage-org" element={<ManageOrg />} />
              </Routes>
            </Auth0ComponentProvider>
          </Auth0Provider>
        </BrowserRouter>
      </TooltipPrimitive.Provider>
    </QueryClientProvider>
  );
};

export default App;
