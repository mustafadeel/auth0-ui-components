import { get, del, post } from '@core/api';

import type {
  ListOrganizationDomainsResponseContent,
  Domain,
  CreateOrganizationDomainRequestContent,
  StartOrganizationDomainVerificationResponseContent,
} from './domain-types';

export async function listDomains(
  baseUrl: string,
): Promise<ListOrganizationDomainsResponseContent> {
  return get(`${baseUrl}my-org/domains`);
}

export async function getDomain(baseUrl: string, domainId: string): Promise<Domain> {
  return get(`${baseUrl}my-org/domains/${domainId}`);
}

export async function createDomain(
  baseUrl: string,
  domain: CreateOrganizationDomainRequestContent,
): Promise<Domain> {
  return post(`${baseUrl}my-org/domains`, domain);
}

export async function verifyDomain(
  baseUrl: string,
  domainId: string,
): Promise<StartOrganizationDomainVerificationResponseContent> {
  return post(`${baseUrl}my-org/domains/${domainId}/verify`, {});
}

export async function deleteDomain(baseUrl: string, domainId: string): Promise<void> {
  return del(`${baseUrl}my-org/domains/${domainId}`);
}
