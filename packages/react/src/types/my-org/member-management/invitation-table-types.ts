import type {
  SharedComponentProps,
  OrganizationInvitationTableMessages,
  OrganizationInvitation,
  OrganizationInvitationFilter,
  ComponentAction,
  EnhancedTranslationFunction,
} from '@auth0/web-ui-components-core';

export type { OrganizationInvitation };

/**
 * Props for the OrganizationInvitationTable component
 */
export interface OrganizationInvitationTableProps
  extends SharedComponentProps<OrganizationInvitationTableMessages> {
  readOnly?: boolean;
  revokeAction?: ComponentAction<OrganizationInvitation>;
  onViewDetails?: (invitation: OrganizationInvitation) => void;
  translatorKey?: string;
}

/**
 * Props for the SearchAndFilter component
 */
export interface SearchAndFilterProps {
  customMessages?: Partial<OrganizationInvitationTableMessages>;
  onSearch?: (search: string) => void;
  onFilterChange?: (filter: Partial<OrganizationInvitationFilter>) => void;
}

/**
 * Hook options for useInvitationTable
 */
export interface UseInvitationTableOptions {
  revokeAction?: ComponentAction<OrganizationInvitation>;
  customMessages?: Partial<OrganizationInvitationTableMessages>;
}

/**
 * Hook result for useInvitationTable
 */
export interface UseInvitationTableResult {
  invitations: OrganizationInvitation[];
  isFetching: boolean;
  isRevoking: boolean;
  filters: OrganizationInvitationFilter;
  fetchInvitations: () => Promise<void>;
  onRevokeInvitation: (invitation: OrganizationInvitation) => Promise<void>;
  onSearch: (search: string) => void;
  onFilterChange: (filter: Partial<OrganizationInvitationFilter>) => void;
}

/**
 * Hook options for useInvitationTableLogic
 */
export interface UseInvitationTableLogicOptions {
  t: EnhancedTranslationFunction;
  onRevokeInvitation: (invitation: OrganizationInvitation) => Promise<void>;
  fetchInvitations: () => Promise<void>;
}

/**
 * Hook result for useInvitationTableLogic
 */
export interface UseInvitationTableLogicResult {
  showDetailsModal: boolean;
  showRevokeModal: boolean;
  selectedInvitation: OrganizationInvitation | null;
  setShowDetailsModal: (show: boolean) => void;
  setShowRevokeModal: (show: boolean) => void;
  handleViewDetails: (invitation: OrganizationInvitation) => void;
  handleRevokeClick: (invitation: OrganizationInvitation) => void;
  handleRevokeConfirm: () => Promise<void>;
  handleCloseDetailsModal: () => void;
  handleCloseRevokeModal: () => void;
}

/**
 * Props for InvitationTableActionsColumn
 */
export interface InvitationTableActionsColumnProps {
  invitation: OrganizationInvitation;
  readOnly?: boolean;
  customMessages?: Partial<OrganizationInvitationTableMessages>;
  onViewDetails: (invitation: OrganizationInvitation) => void;
  onRevoke: (invitation: OrganizationInvitation) => void;
}
