import { Auth0Provider } from '@auth0/auth0-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Auth0ComponentProvider } from '@/auth0-ui-components/providers/component-provider';

import Header from './components/Header';
import { Routes, Route, BrowserRouter } from './components/RouterCompat';
import { Sidebar } from './components/side-bar';
import { config } from './config/env';
import DomainManagement from './pages/DomainManagement';
import Index from './pages/Index';
import ManageOrg from './pages/ManageOrg';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

// Layout component with sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <div className="ml-64">{children}</div>
    </div>
  );
};

const App = () => {
  const { i18n } = useTranslation();
  const defaultAuthDetails = {
    domain: config.auth0.domain,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipPrimitive.Provider>
        <BrowserRouter>
          <Auth0Provider
            domain={config.auth0.domain}
            clientId={config.auth0.clientId}
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <Auth0ComponentProvider
              authDetails={defaultAuthDetails}
              i18n={{ currentLanguage: i18n.language }}
            >
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/org-management" element={<ManageOrg />} />
                  <Route path="/domain-management" element={<DomainManagement />} />
                </Routes>
              </AppLayout>
            </Auth0ComponentProvider>
          </Auth0Provider>
        </BrowserRouter>
      </TooltipPrimitive.Provider>
    </QueryClientProvider>
  );
};

export default App;
