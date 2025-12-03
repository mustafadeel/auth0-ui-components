import type {
  SharedComponentProps,
  OrganizationMemberManagementMessages,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationMemberManagement component
 */
export interface OrganizationMemberManagementProps
  extends SharedComponentProps<OrganizationMemberManagementMessages> {
  hideHeader?: boolean;
  defaultTab?: 'member' | 'invitation';
  translatorKey?: string;
}
