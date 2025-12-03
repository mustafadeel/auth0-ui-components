export interface InvitationCreateSchemas {
  email?: {
    errorMessage?: string;
    required?: boolean;
  };
  roles?: {
    errorMessage?: string;
  };
}
