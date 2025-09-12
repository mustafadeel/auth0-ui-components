import type {
  OrgEditCustomMessages,
  BlockComponentSharedProps,
  OrganizationDetailSchemaValidation,
  OrganizationEdit,
  ComponentAction,
  BackButton,
} from '@auth0-web-ui-components/core';
import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import type { OrgDeleteClasses } from './org-delete-types';
import type { OrgDetailsClasses } from './org-details-types';

export interface OrgEditClasses extends OrgDetailsClasses, OrgDeleteClasses {}

export interface OrgEditSaveAction extends ComponentAction<OrganizationEdit> {}

export interface OrgEditDeleteAction extends ComponentAction<OrganizationEdit> {}

export interface OrgEditBackButton extends Omit<BackButton, 'onClick'> {
  icon?: LucideIcon;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface OrgDetailsEditProps
  extends BlockComponentSharedProps<
    OrgEditCustomMessages,
    OrgEditClasses,
    OrganizationDetailSchemaValidation
  > {
  organizationId: string;
  saveAction?: OrgEditSaveAction;
  deleteAction?: OrgEditDeleteAction;
  cancelAction?: {
    onClick?: (event?: Event) => void;
  };
  hideHeader?: boolean;
  backButton?: OrgEditBackButton;
}
