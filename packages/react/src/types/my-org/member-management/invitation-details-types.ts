import type {
  SharedComponentProps,
  OrganizationInvitationDetailsMessages,
  OrganizationInvitation,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationInvitationDetailsModal component
 */
export interface OrganizationInvitationDetailsModalProps
  extends SharedComponentProps<OrganizationInvitationDetailsMessages> {
  isOpen: boolean;
  invitation: OrganizationInvitation | null;
  onClose: () => void;
  onResend?: (invitation: OrganizationInvitation) => Promise<void>;
  translatorKey?: string;
}
