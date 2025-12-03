// TODO: Import from @auth0/myorganization-js when API types are available
// import type { MyOrganization } from '@auth0/myorganization-js';

// Placeholder types - will be replaced with actual API types
export type GetOrganizationMemberResponseContent = unknown;
export type ListOrganizationMembersResponseContent = unknown;
export type GetOrganizationInvitationResponseContent = unknown;
export type ListOrganizationInvitationsResponseContent = unknown;
export type CreateOrganizationInvitationRequestContent = unknown;
export type CreateOrganizationInvitationResponseContent = unknown;

type MemberStatus = 'active' | 'inactive' | 'pending';
type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export interface OrganizationMember {
  id: string;
  user_id: string;
  org_id: string;
  email: string;
  name?: string;
  picture?: string;
  status: MemberStatus;
  roles: string[];
  created_at: string;
  updated_at?: string;
}

export interface OrganizationInvitation {
  id: string;
  org_id: string;
  inviter_id: string;
  invitee_email: string;
  status: InvitationStatus;
  roles: string[];
  expires_at: string;
  created_at: string;
  updated_at?: string;
}

export interface OrganizationInvitationCreate {
  invitee_email: string;
  roles?: string[];
  send_invitation_email?: boolean;
}

export interface OrganizationInvitationFilter {
  status?: InvitationStatus;
  search?: string;
  page?: number;
  per_page?: number;
}
