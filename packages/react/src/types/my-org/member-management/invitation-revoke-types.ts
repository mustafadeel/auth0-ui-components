import type {
  SharedComponentProps,
  OrganizationInvitationRevokeMessages,
  OrganizationInvitation,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationInvitationRevokeModal component
 */
export interface OrganizationInvitationRevokeModalProps
  extends SharedComponentProps<OrganizationInvitationRevokeMessages> {
  isOpen: boolean;
  isLoading?: boolean;
  invitation: OrganizationInvitation | null;
  onClose: () => void;
  onRevoke: (invitation: OrganizationInvitation) => Promise<void>;
  translatorKey?: string;
  className?: string;
}
