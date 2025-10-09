export const MY_ACCOUNT_MFA_SCOPES =
  'openid profile email create:me:authentication_methods read:me:authentication_methods delete:me:authentication_methods update:me:authentication_methods read:me:factors';

export const MY_ACCOUNT_SCOPES = [MY_ACCOUNT_MFA_SCOPES].join(' ');
