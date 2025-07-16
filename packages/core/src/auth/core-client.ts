import { AuthDetailsCore, CoreClientInterface } from './auth-types';
import { I18nService, I18nInitOptions } from '../i18n';
import { AuthenticationAPIService } from '../services/authentication-api-service';
import TokenManager from './token-manager';
import { toURL } from './auth-utils';

export class CoreClient implements CoreClientInterface {
  public readonly auth: AuthDetailsCore;
  public readonly i18nService: I18nService;
  private readonly tokenManager: TokenManager;

  // API services
  public readonly authenticationApiService: AuthenticationAPIService;

  private constructor(auth: AuthDetailsCore, i18nService: I18nService) {
    this.auth = auth;
    this.i18nService = i18nService;
    this.tokenManager = new TokenManager(this);
    this.authenticationApiService = new AuthenticationAPIService(this);
  }

  static async create(
    authDetails: AuthDetailsCore,
    i18nOptions?: I18nInitOptions,
  ): Promise<CoreClient> {
    // Initialize i18n service
    const i18nService = await I18nService.create(
      i18nOptions || {
        currentLanguage: 'en-US',
        fallbackLanguage: 'en-US',
      },
    );

    // Initialize auth details
    let auth = authDetails;
    if (authDetails.contextInterface) {
      try {
        const tokenRes = await authDetails.contextInterface.getAccessTokenSilently({
          cacheMode: 'off',
          detailedResponse: true,
        });
        auth = {
          ...authDetails,
          accessToken: tokenRes.access_token,
          scopes: tokenRes.scope,
        };
      } catch (err) {
        auth = {
          ...authDetails,
          accessToken: undefined,
          domain: undefined,
          clientId: undefined,
          scopes: undefined,
        };
      }
    }

    return new CoreClient(auth, i18nService);
  }

  async getToken(
    scope: string,
    audiencePath: string,
    ignoreCache: boolean = false,
  ): Promise<string | undefined> {
    return this.tokenManager.getToken(scope, audiencePath, ignoreCache);
  }

  getApiBaseUrl(): string {
    // Use authProxyUrl if provided (proxy mode)
    if (this.isProxyMode()) {
      return this.auth.authProxyUrl!.endsWith('/')
        ? this.auth.authProxyUrl!
        : `${this.auth.authProxyUrl!}/`;
    }

    const domain = this.auth.domain;
    if (!domain) {
      throw new Error('getApiBaseUrl: Auth0 domain is not configured');
    }
    return toURL(domain);
  }

  isProxyMode(): boolean {
    return !!this.auth.authProxyUrl;
  }
}
