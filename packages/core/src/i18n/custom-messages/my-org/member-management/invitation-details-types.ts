export interface OrganizationInvitationDetailsMessages {
  modal?: {
    title?: string;
    fields?: {
      email_label?: string;
      roles_label?: string;
      status_label?: string;
      invited_date_label?: string;
      expires_date_label?: string;
      inviter_label?: string;
    };
    actions?: {
      close_button_text?: string;
      resend_button_text?: string;
    };
  };
  notifications?: {
    resend_success?: string;
    resend_error?: string;
  };
}
