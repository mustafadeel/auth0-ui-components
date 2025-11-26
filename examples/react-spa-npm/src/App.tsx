import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0ComponentProvider } from '@auth0/web-ui-components-react/spa';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';

// ===== TOAST LIBRARY IMPORTS =====
// For Notistack (Currently Active):
// import { SnackbarProvider, enqueueSnackbar } from 'notistack';

// For React Toastify (Commented out):
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toaster, Toaster } from './components/ui/toaster';

import { Navbar } from './components/nav-bar';
import { Sidebar } from './components/side-bar';
import { config } from './config/env';
import DomainManagementPage from './views/domain-management-page';
import HomePage from './views/home-page';
import MFAPage from './views/mfa-page';
import OrgManagementPage from './views/org-management-page';
import SsoProviderCreatePage from './views/sso-provider-create-page';
import SsoProviderEditPage from './views/sso-provider-edit-page';
import SsoProviderPage from './views/sso-provider-page';
import UserProfilePage from './views/user-profile-page';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen">
      <Navbar />
      {isAuthenticated && <Sidebar />}
      <main className={`pt-16 ${isAuthenticated ? 'ml-64' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mfa"
            element={
              <ProtectedRoute>
                <MFAPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-management"
            element={
              <ProtectedRoute>
                <OrgManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sso-providers"
            element={
              <ProtectedRoute>
                <SsoProviderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sso-provider/create"
            element={
              <ProtectedRoute>
                <SsoProviderCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sso-provider/edit/:id"
            element={
              <ProtectedRoute>
                <SsoProviderEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/domain-management"
            element={
              <ProtectedRoute>
                <DomainManagementPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  const defaultAuthDetails = {
    domain: config.auth0.domain,
  };

  // 🎯 TOAST CONFIGURATION OPTIONS - Using New Render Prop Approach
  // Uncomment ONE of the configurations below to test different toast libraries

  // ===== OPTION 1: Default Sonner (Zero Config) =====
  // No configuration needed - Sonner works out of the box
  // const toastConfig = undefined; // or just omit toastSettings entirely

  // ===== OPTION 2: React Toastify =====
  // Required: Uncomment import above and install: npm install react-toastify
  // const customToastMethods = {
  //   success: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called success toast:', message);
  //     return toast.success(message, { position: 'top-right', autoClose: 5000, ...options });
  //   },
  //   error: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called error toast:', message);
  //     return toast.error(message, { position: 'top-right', autoClose: 8000, ...options });
  //   },
  //   warning: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called warning toast:', message);
  //     return toast.warning(message, { position: 'top-right', autoClose: 6000, ...options });
  //   },
  //   info: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called info toast:', message);
  //     return toast.info(message, { position: 'top-right', autoClose: 5000, ...options });
  //   },
  // };
  // const toastConfig = {
  //   provider: 'custom' as const,
  //   customMethods: customToastMethods,
  //   renderToastProvider: (children: React.ReactNode) => (
  //     <>
  //       {children}
  //       <ToastContainer
  //         position="top-right"
  //         autoClose={5000}
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //       />
  //     </>
  //   ),
  // };

  // ===== OPTION 3: React Hot Toast =====
  // Required: npm install react-hot-toast (already installed)
  // const customToastMethods = {
  //   success: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called success toast:', message);
  //     return toast.success(message, { duration: 4000, position: 'bottom-center', ...options });
  //   },
  //   error: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called error toast:', message);
  //     return toast.error(message, { duration: 6000, position: 'bottom-center', ...options });
  //   },
  //   warning: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called warning toast:', message);
  //     return toast(message, { icon: '⚠️', duration: 5000, position: 'bottom-center', ...options });
  //   },
  //   info: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called info toast:', message);
  //     return toast(message, { icon: 'ℹ️', duration: 4000, position: 'bottom-center', ...options });
  //   },
  // };
  // const toastConfig = {
  //   provider: 'custom' as const,
  //   customMethods: customToastMethods,
  //   renderToastProvider: (children: React.ReactNode) => (
  //     <>
  //       {children}
  //       <Toaster
  //         position="bottom-center"
  //         gutter={8}
  //         toastOptions={{
  //           duration: 4000,
  //           style: {
  //             background: '#363636',
  //             color: '#fff',
  //           },
  //         }}
  //       />
  //     </>
  //   ),
  // };

  // ===== OPTION 4: Notistack (Currently Active) =====
  // Required: npm install notistack (already installed)
  // const customToastMethods = {
  //   success: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called success toast:', message);
  //     return enqueueSnackbar(message, {
  //       variant: 'success',
  //       anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  //       autoHideDuration: 5000,
  //       ...options
  //     });
  //   },
  //   error: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called error toast:', message);
  //     return enqueueSnackbar(message, {
  //       variant: 'error',
  //       anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  //       autoHideDuration: 8000,
  //       ...options
  //     });
  //   },
  //   warning: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called warning toast:', message);
  //     return enqueueSnackbar(message, {
  //       variant: 'warning',
  //       anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  //       autoHideDuration: 6000,
  //       ...options
  //     });
  //   },
  //   info: (message: string, options?: any) => {
  //     console.log('🎯 Auth0 component called info toast:', message);
  //     return enqueueSnackbar(message, {
  //       variant: 'info',
  //       anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  //       autoHideDuration: 5000,
  //       ...options
  //     });
  //   },
  // };

  // const toastConfig = {
  //   provider: 'custom' as const,
  //   // customMethods: customToastMethods,
  //   renderToastProvider: (children: React.ReactNode) => (
  //     <SnackbarProvider
  //       maxSnack={5}
  //       anchorOrigin={{
  //         vertical: 'bottom',
  //         horizontal: 'right',
  //       }}
  //       autoHideDuration={5000}
  //       dense
  //       preventDuplicate
  //     >
  //       {children}
  //     </SnackbarProvider>
  //   ),
  // };

  return (
    <Auth0ComponentProvider
      authDetails={defaultAuthDetails}
      i18n={{ currentLanguage: i18n.language }}
      themeSettings={{
        theme: 'default',
        mode: 'light',
      }}
      // toastSettings={toastConfig}
    >
      <AppContent />
    </Auth0ComponentProvider>
  );
}

export default App;
