/**
 * Retrieves a localized value from a language map.
 * Returns the value for the given language, or a fallback if unavailable.
 * Returns undefined if the map is empty or undefined.
 *
 * @template T - The shape of the localized content.
 *
 * @param map - A mapping of language codes to localized values.
 * @param lang - Preferred language code (e.g., 'en', 'fr').
 * @param fallbackLang - Language code to fall back to if the preferred one isn't found. Defaults to 'en'.
 *
 * @returns The localized value, or undefined if not found.
 */
export function getLocalized<T>(
  map?: Record<string, T>,
  lang?: string,
  fallbackLang = 'en-US',
): T | undefined {
  if (!map || !Object.keys(map).length) return undefined;
  return map[lang ?? fallbackLang] ?? map[fallbackLang];
}
