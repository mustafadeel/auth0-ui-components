import type { InvitationTableActionsColumnProps } from '../../../../types/my-org/member-management/invitation-table-types';

/**
 * InvitationTableActionsColumn Component
 *
 * Handles the actions column for invitation table with dropdown menu.
 *
 * TODO: Implement with:
 * - Dropdown menu with actions
 * - View Details action (Eye icon)
 * - Revoke action (XCircle icon) - only for pending invitations
 */
export function InvitationTableActionsColumn({
  invitation,
  readOnly = false,
  customMessages,
  onViewDetails,
  onRevoke,
}: InvitationTableActionsColumnProps) {
  return (
    <div>
      {/* TODO: Implement dropdown menu with actions */}
      <p>Actions</p>
    </div>
  );
}
