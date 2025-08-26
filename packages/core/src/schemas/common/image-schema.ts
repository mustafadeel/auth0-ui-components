import { z } from 'zod';

export interface ImageSchemaOptions {
  errorMessage?: string;
  required?: boolean;
  allowedExtensions?: string[];
  allowDataUrls?: boolean;
}

/**
 * Creates a schema for image/logo validation with custom error message and optional validation
 * @param options - Configuration options for image validation
 * @returns Zod schema for image validation
 */
export const createImageSchema = (options: ImageSchemaOptions = {}) => {
  const {
    errorMessage,
    required = false,
    allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    allowDataUrls = true,
  } = options;

  const defaultMessage = errorMessage || 'Please provide a valid image';

  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return /^https?:$/.test(parsedUrl.protocol);
    } catch {
      return false;
    }
  };

  const hasValidExtension = (path: string): boolean => {
    const extension = path.split('.').pop()?.toLowerCase();
    return !!extension && allowedExtensions.map((ext) => ext.toLowerCase()).includes(extension);
  };

  const imageValidation = z.string().refine(
    (value) => {
      if (!value) return !required;

      // Data URLs (base64 encoded images)
      if (value.startsWith('data:image/')) {
        return allowDataUrls;
      }

      // HTTP/HTTPS URLs
      if (isValidUrl(value)) {
        return true;
      }

      // Local/relative paths - only allowed when data URLs are enabled
      if (allowDataUrls && /^(\/|\.\/|\.\.\/)/.test(value)) {
        return hasValidExtension(value);
      }

      return false;
    },
    {
      message: allowDataUrls ? defaultMessage : 'Please provide a valid HTTP/HTTPS image URL',
    },
  );

  return z.object({
    logo: required ? imageValidation : imageValidation.optional(),
  });
};

/**
 * Default schema for image validation (optional)
 */
export const ImageSchema = createImageSchema();

/**
 * Type for image form data
 */
export type ImageForm = z.infer<typeof ImageSchema>;
