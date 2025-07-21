import { UserMFAMgmt } from '@auth0-web-ui-components/react';

const UserProfilePage = () => {
  return (
    <UserMFAMgmt
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
  );
};

export default UserProfilePage;
