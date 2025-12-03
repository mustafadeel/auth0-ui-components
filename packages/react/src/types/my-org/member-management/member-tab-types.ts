import type {
  SharedComponentProps,
  OrganizationMemberTabMessages,
} from '@auth0/web-ui-components-core';

/**
 * Props for the OrganizationMemberTab component
 */
export interface OrganizationMemberTabProps
  extends SharedComponentProps<OrganizationMemberTabMessages> {
  readOnly?: boolean;
  translatorKey?: string;
}
