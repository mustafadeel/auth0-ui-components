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
            // classNames: {
            //   // Main container
            //   container: 'max-w-2xl mx-auto font-sans bg-white dark:bg-gray-900 rounded-xl shadow-sm',
            //   // Main card and content
            //   card: 'border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm',
            //   cardContent: 'p-6 sm:p-8',
            //   // Header elements
            //   title: 'text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2',
            //   description: 'text-sm text-gray-600 dark:text-gray-300 mb-6',
            //   // Error state elements
            //   errorContainer: 'bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6',
            //   errorTitle: 'text-red-600 dark:text-red-400 font-medium mb-1',
            //   errorMessage: 'text-red-500 dark:text-red-300',
            //   // Factor list elements
            //   factorList: 'space-y-4 divide-y divide-gray-100 dark:divide-gray-800',
            //   factorItem:
            //     'pt-4 first:pt-0 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg',
            //   factorItemContainer: 'flex items-start gap-4 p-3',
            //   factorTitle: 'font-medium text-gray-900 dark:text-white',
            //   factorBadge:
            //     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded',
            //   factorDescription: 'text-sm text-gray-500 dark:text-gray-400',
            //   // Factor card for SMS/Email
            //   factorCard: 'border border-gray-200 dark:border-gray-700 rounded-lg mt-3',
            //   factorCardContent: 'p-3 flex items-center justify-between',
            //   factorIcon: 'text-blue-500 dark:text-blue-400',
            //   factorValue: 'text-gray-700 dark:text-gray-300',
            //   // Buttons
            //   enrollButton:
            //     'bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors',
            //   removeButton:
            //     'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300',
            //   // Dialog elements
            //   dialogContent: 'bg-white dark:bg-gray-900 rounded-2xl max-w-md p-6',
            //   dialogHeader: 'mb-4',
            //   dialogTitle: 'text-xl font-semibold text-gray-900 dark:text-white',
            //   dialogSeparator: 'bg-gray-200 dark:bg-gray-700',
            //   dialogDescription: 'text-sm text-gray-600 dark:text-gray-300 mt-2',
            //   dialogBody: 'py-4',
            //   dialogActions: 'flex justify-center gap-3 mt-6 w-full',
            //   dialogConfirmButton:
            //     'bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors flex-1',
            //   dialogCancelButton:
            //     'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-4 py-2 text-sm font-medium transition-colors flex-1',
            //   // Form elements
            //   formContainer: 'max-w-sm mx-auto',
            //   formDescription: 'text-sm text-gray-600 dark:text-gray-300 mb-5 text-center',
            //   form: 'space-y-5',
            //   formItem: 'space-y-2',
            //   formLabel: 'text-sm font-medium text-gray-700 dark:text-gray-300 block',
            //   formField: 'w-full',
            //   formInput:
            //     'w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white',
            //   formErrorMessage: 'text-red-500 dark:text-red-400 text-sm',
            //   formButtonGroup: 'flex flex-col gap-3 mt-6',
            //   formSubmitButton:
            //     'bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors w-full',
            //   formBackButton:
            //     'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-4 py-2 text-sm font-medium transition-colors w-full',
            //   formCancelButton:
            //     'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-4 py-2 text-sm font-medium transition-colors w-full',
            //   // Specific to OTP
            //   otpField: 'flex gap-2 justify-center',
            //   // Specific to Contact form
            //   emailIcon: 'text-blue-500 dark:text-blue-400',
            //   phoneIcon: 'text-blue-500 dark:text-blue-400',
            //   // Specific to QR Code form
            //   qrCodeContainer: 'bg-white p-4 rounded-lg inline-flex mx-auto mb-6 shadow-sm',
            //   emptyState: 'text-center py-10 text-gray-500 dark:text-gray-400',
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
