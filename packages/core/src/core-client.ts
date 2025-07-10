import { AuthDetailsCore, CoreClientInterface } from './types';
import { initializeI18n, TFactory, TranslationFunction } from './i18n';
import { AuthenticationAPIService } from './services/authentication-api-service';
import TokenManager from './token-manager';

export class CoreClient implements CoreClientInterface {
  public readonly auth: AuthDetailsCore;
  public readonly translator: TranslationFunction;
  private readonly tokenManager: TokenManager;
  // API services
  public readonly authentication: AuthenticationAPIService;

  private constructor(auth: AuthDetailsCore, translatorFunc: TranslationFunction) {
    this.auth = auth;
    this.translator = translatorFunc;
    this.tokenManager = new TokenManager(this);
    this.authentication = new AuthenticationAPIService(this);
  }

  static async create(
    authDetails: AuthDetailsCore,
    translatorFactory?: TFactory,
  ): Promise<CoreClient> {
    // Initialize translator
    let translatorFunc: TranslationFunction;
    if (translatorFactory) {
      translatorFunc = translatorFactory('common');
    } else {
      // Fallback: create a basic translator if none provided
      const i18n = await initializeI18n({
        currentLanguage: 'en-US',
        fallbackLanguage: 'en-US',
      });
      translatorFunc = i18n.translator('common');
    }

    // Initialize auth details
    let auth = authDetails;
    if (authDetails.contextInterface) {
      try {
        const tokenRes = await authDetails.contextInterface.getAccessTokenSilently({
          cacheMode: 'off',
          detailedResponse: true,
        });
        const claims = await authDetails.contextInterface.getIdTokenClaims();
        auth = {
          ...authDetails,
          accessToken: tokenRes.access_token,
          domain: claims?.iss,
          clientId: claims?.aud,
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

    return new CoreClient(auth, translatorFunc);
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
      throw new Error(this.translator('errors.domain_not_configured'));
    }
    return domain.endsWith('/') ? domain : `${domain}/`;
  }

  isProxyMode(): boolean {
    return !!this.auth.authProxyUrl;
  }
}
