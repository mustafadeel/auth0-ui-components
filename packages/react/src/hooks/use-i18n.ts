import { useState, useEffect } from 'react';
import { useComponentConfig } from './use-config';
import { getLocalizedComponentAsync } from '@auth0-web-ui-components/core';

/**
 * React hook to asynchronously fetch and manage localized string lookup function for a given component.
 *
 * The hook fetches the translations for the current language (falling back to a fallback language)
 * and returns a lookup function `t(key)` that returns the localized string or the key itself if not found.
 *
 * While translations are loading or missing, the lookup function always returns the key as the default behavior.
 *
 * @template T - The shape of the localized strings object.
 * @param {string} component - The name of the component to load translations for.
 * @param {Record<string, Partial<T>>} [overrides] - Optional translation overrides keyed by language codes.
 *
 * @returns {(key: string, vars?: Record<string, unknown>) => string | undefined}
 *   A function to look up localized strings by key.
 *
 * @example
 * ```tsx
 * const t = useI18n<{ title: string, description: string }>('Header', {
 *   en: { title: "Hello" }
 * });
 * return <h1>{t('title')}</h1>;
 * ```
 */
export function useI18n<T extends object>(
  component: string,
  overrides?: Partial<T>,
): (key: string, vars?: Record<string, unknown>) => string | null {
  const { config } = useComponentConfig();
  const lang = config.i18n?.currentLanguage;
  const fallback = config.i18n?.fallbackLanguage;

  const [tFunction, setTFunction] = useState<
    ((key: string, vars?: Record<string, unknown>) => string | null) | null
  >(null);

  useEffect(() => {
    if (!lang || !component) {
      setTFunction(() => () => null); // Return null if lang or component is missing
      return;
    }

    const load = async () => {
      try {
        const t = await getLocalizedComponentAsync<T>(lang, component, fallback ?? 'en', overrides);

        // If translations are successfully loaded, set t as the lookup function
        setTFunction(() => (key: string, vars?: Record<string, unknown>) => {
          if (t) {
            const translation = t(key, vars);
            return translation ?? key; // Return key itself if translation is missing
          }
          return key; // If `t` is not loaded, return the key itself
        });
      } catch (error) {
        console.error('[useI18n] Error loading localized strings:', error);
        setTFunction(() => () => null); // Fallback to returning null if there's an error
      }
    };

    load();
  }, [lang, component, fallback]);

  // Return tFunction or a default function that returns the key itself when translations are not available
  return tFunction ?? ((key: string) => key); // Return the key itself by default
}
