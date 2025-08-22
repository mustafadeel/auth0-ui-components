import { UserMFAMgmt } from '@auth0-web-ui-components/react';

const UserProfilePage = () => {
  return (
    <div className="space-y-6">
      <UserMFAMgmt
        styling={
          {
            // variables: {
            //   common: {
            //     '--font-size-heading': '50px',
            //     '--font-size-description': '1.25rem',
            //     '--font-size-title': '20px',
            //     '--font-size-paragraph': '0.875rem',
            //     '--font-size-label': '0.875rem',
            //   },
            //   light: {
            //     '--color-card-foreground': 'red',
            //     '--color-primary': 'blue',
            //     '--color-primary-foreground': 'white',
            //     '--color-foreground': 'orange',
            //     '--color-muted-foreground': 'orange',
            //     '--color-accent-foreground': '#a1a1ee',
            //     '--color-border': 'green',
            //   },
            //   dark: {
            //     '--color-primary': 'red',
            //     '--color-primary-foreground': 'white',
            //     '--color-foreground': 'red',
            //     '--color-muted-foreground': 'green',
            //     '--color-accent-foreground': '#a1a1ee',
            //   },
            // },
            // classes: {
            //   // Main card and content
            //   'UserMFAMgmt-card': 'border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm',
            //   // Dialog elements
            //   'UserMFASetupForm-dialogContent': 'bg-white border-2 border-blue-500 dark:bg-green-900 dark:border-blue-400 rounded-2xl max-w-md p-6'
            // },
          }
        }
        factorConfig={{
          duo: {
            visible: false,
          },
          'webauthn-platform': {
            visible: false,
          },
          'recovery-code': {
            visible: false,
          },
          'webauthn-roaming': {
            visible: false,
          },
        }}
      />
    </div>
  );
};

export default UserProfilePage;
