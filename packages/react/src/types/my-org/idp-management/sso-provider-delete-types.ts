import type {
  SharedComponentProps,
  SsoProvideDeleteMessages,
  SsoProviderDeleteModalContentMessages,
  IdentityProvider,
  SsoProviderDeleteSchema,
} from '@auth0-web-ui-components/core';

export interface SsoProviderDeleteClasses {
  'ProviderDelete-root'?: string;
}

export interface SsoProviderDeleteModalContentProps
  extends SharedComponentProps<SsoProviderDeleteModalContentMessages, SsoProviderDeleteClasses> {
  onChange: (name: string, value: string) => void;
  className?: string;
}

export interface SsoProviderDeleteProps
  extends SharedComponentProps<
    SsoProvideDeleteMessages,
    SsoProviderDeleteClasses,
    SsoProviderDeleteSchema
  > {
  provider: IdentityProvider;
  className?: string;
  onDelete: (idpId: string) => Promise<void>;
  isLoading?: boolean;
}
