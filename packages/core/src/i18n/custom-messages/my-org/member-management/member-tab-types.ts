export interface OrganizationMemberTabMessages {
  header?: {
    title?: string;
    description?: string;
  };
  table?: {
    empty_message?: string;
    columns?: {
      name?: string;
      email?: string;
      roles?: string;
      status?: string;
      joined_date?: string;
    };
  };
}
