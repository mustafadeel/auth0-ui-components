export interface OrganizationInvitationRevokeMessages {
  modal?: {
    title?: string;
    description?: string;
    actions?: {
      revoke_button_text?: string;
      cancel_button_text?: string;
    };
  };
  notifications?: {
    revoke_success?: string;
    revoke_error?: string;
  };
}
