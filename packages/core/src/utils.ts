export function toURL(domain: string): string {
  const domainWithSlash = domain.endsWith('/') ? domain : `${domain}/`;
  if (domainWithSlash.startsWith('http://') || domainWithSlash.startsWith('https://')) {
    return domainWithSlash;
  }
  return `https://${domainWithSlash}`;
}
