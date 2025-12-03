export interface OrganizationInvitationTableMessages {
  search?: {
    placeholder?: string;
  };
  filter?: {
    status_label?: string;
    all_status?: string;
    pending?: string;
    accepted?: string;
    expired?: string;
    revoked?: string;
  };
  table?: {
    empty_message?: string;
    columns?: {
      email?: string;
      roles?: string;
      status?: string;
      invited_date?: string;
      expires_date?: string;
    };
    actions?: {
      view_details_button_text?: string;
      revoke_button_text?: string;
    };
  };
  notifications?: {
    fetch_invitations_error?: string;
    revoke_invitation_success?: string;
    revoke_invitation_error?: string;
  };
}
