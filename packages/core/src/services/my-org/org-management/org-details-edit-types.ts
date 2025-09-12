import type { OrganizationDetailFormValues } from '@core/schemas';

import type { OrgDeletesCustomMessages } from './org-delete-types';
import type { OrgDetailsCustomMessages } from './org-details-types';

/**
 * Interface for Org Edit messages that extends both OrgDetails and OrgDelete messages.
 */
export interface OrgEditCustomMessages {
  header?: {
    title?: string;
    back_button_text?: string;
  };
  details?: OrgDetailsCustomMessages;
  delete?: OrgDeletesCustomMessages;
}

export interface Organization extends OrganizationDetailFormValues {
  id?: string;
}

export interface OrganizationEdit extends Organization {
  id: string;
}
