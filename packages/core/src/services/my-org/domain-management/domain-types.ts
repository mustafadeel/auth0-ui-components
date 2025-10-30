import type { InternalDomainCreateFormValues } from '@core/schemas';
import type { Auth0MyOrg } from 'auth0-myorg-sdk';

export type GetOrganizationDomainResponseContent = Auth0MyOrg.GetOrganizationDomainResponseContent;
export type CreateOrganizationDomainResponseContent =
  Auth0MyOrg.CreateOrganizationDomainResponseContent;
export type CreateOrganizationDomainRequestContent =
  Auth0MyOrg.CreateOrganizationDomainRequestContent;

export type CreateDomainRequestContentPrivate = InternalDomainCreateFormValues;

type DomainStatus = 'pending' | 'failed' | 'verified';

export interface DomainCreate {
  domain: string;
}

export interface Domain {
  id: string;
  org_id: string;
  domain: string;
  status: DomainStatus;
  verification_txt: string;
  verification_host: string;
}
