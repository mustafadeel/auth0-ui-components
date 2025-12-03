export interface OrganizationInvitationCreateMessages {
  modal?: {
    title?: string;
    description?: string;
    field?: {
      email_label?: string;
      email_placeholder?: string;
      email_error?: string;
      roles_label?: string;
      roles_placeholder?: string;
      send_email_label?: string;
      send_email_description?: string;
    };
    actions?: {
      create_button_text?: string;
      cancel_button_text?: string;
    };
  };
  notifications?: {
    create_success?: string;
    create_error?: string;
  };
}
