import { z } from 'zod';

/**
 * Creates a schema for color validation with custom error message and optional custom regex
 * @param errorMessage - Custom error message for invalid color
 * @param customRegex - Optional custom regex for color validation
 * @param required - Whether the color field is required (default: true)
 * @returns Zod schema for color validation
 */
export const createColorSchema = (errorMessage?: string, customRegex?: RegExp, required = true) => {
  const hexColorRegex = customRegex || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const defaultMessage = errorMessage || 'Please enter a valid hex color (e.g., #FF5733 or #FFF)';

  const colorField = z.string().regex(hexColorRegex, { message: defaultMessage });

  return z.object({
    color: required ? colorField : colorField.optional(),
  });
};

/**
 * Default schema for color validation
 */
export const ColorSchema = createColorSchema();

/**
 * Type for color form data
 */
export type ColorForm = z.infer<typeof ColorSchema>;
