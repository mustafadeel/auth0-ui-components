import type {
  SharedComponentProps,
  OrganizationInvitationCreateMessages,
  InvitationCreateSchemas,
  ComponentAction,
  OrganizationInvitation,
  OrganizationInvitationCreate,
  EnhancedTranslationFunction,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationInvitationCreateModal component
 */
export interface OrganizationInvitationCreateModalProps
  extends SharedComponentProps<
    OrganizationInvitationCreateMessages,
    never,
    { create?: InvitationCreateSchemas }
  > {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCreate: (data: OrganizationInvitationCreate) => Promise<void>;
  translatorKey?: string;
  className?: string;
}

/**
 * Hook options for useInvitationCreate
 */
export interface UseInvitationCreateOptions {
  createAction?: ComponentAction<OrganizationInvitation>;
  customMessages?: Partial<OrganizationInvitationCreateMessages>;
}

/**
 * Hook result for useInvitationCreate
 */
export interface UseInvitationCreateResult {
  isCreating: boolean;
  onCreateInvitation: (
    data: OrganizationInvitationCreate,
  ) => Promise<OrganizationInvitation | null>;
}

/**
 * Hook options for useInvitationCreateLogic
 */
export interface UseInvitationCreateLogicOptions {
  t: EnhancedTranslationFunction;
  onCreateInvitation: (
    data: OrganizationInvitationCreate,
  ) => Promise<OrganizationInvitation | null>;
  onClose: () => void;
}

/**
 * Hook result for useInvitationCreateLogic
 */
export interface UseInvitationCreateLogicResult {
  handleCreate: (data: OrganizationInvitationCreate) => Promise<void>;
}
