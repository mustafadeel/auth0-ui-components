import { useComponentConfig } from './use-config';
import { getLocalized } from '@auth0-web-ui-components/core';

/**
 * useI18n
 *
 * React hook to retrieve a localized value based on current i18n settings from the global config.
 *
 * ## Requirements
 * - Must be used within an Auth0ComponentProvider to access configuration.
 * - The component config must include `i18n.currentLanguage`.
 *
 * ## Features
 * - Automatically selects localized content matching the current language.
 * - Falls back to a configurable fallback language if the current language is not found.
 * - Returns undefined if the localization map is empty or undefined.
 *
 * @template T - The type of the localized content.
 *
 * @param {Record<string, T> | undefined} map - A dictionary mapping language codes to localized content.
 *
 * @returns {T | undefined} The localized content for the current or fallback language, or undefined if none matches.
 *
 * @example
 * ```tsx
 * const { title, description } = useI18n(factor.localization) ?? {};
 * return <h1>{title}</h1>;
 * ```
 */
export function useI18n<T>(map?: Record<string, T>): T | undefined {
  const { config } = useComponentConfig();
  const lang = config.i18n?.currentLanguage;
  const fallback = config.i18n?.fallbackLanguage ?? 'en-US';

  return getLocalized(map, lang, fallback);
}
