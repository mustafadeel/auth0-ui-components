import type {
  SharedComponentProps,
  OrganizationInvitationTabMessages,
  ComponentAction,
  OrganizationInvitation,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationInvitationTab component
 */
export interface OrganizationInvitationTabProps
  extends SharedComponentProps<OrganizationInvitationTabMessages> {
  readOnly?: boolean;
  createAction?: ComponentAction<OrganizationInvitation>;
  revokeAction?: ComponentAction<OrganizationInvitation>;
  onCreateClick?: () => void;
  translatorKey?: string;
}
