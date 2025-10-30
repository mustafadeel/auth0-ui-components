/**
 * Represents a standardized API error shape.
 */
export interface ApiError {
  readonly name: 'ApiError';
  readonly message: string;
  readonly status: number;
  readonly data?: {
    error?: string;
    [key: string]: unknown;
  };
}
