import type { ApiErrorData } from './types';

export interface ApiError {
  readonly name: 'ApiError';
  readonly message: string;
  readonly status: number;
  readonly data?: ApiErrorData;
}

/**
 * Factory function to create an ApiError object.
 *
 * @param message - Error message describing the issue.
 * @param status - HTTP status code.
 * @param data - Optional structured API error data.
 * @returns An ApiError object.
 *
 * @example
 * ```ts
 * throw createApiError('Not Found', 404, {
 *   code: 'user_not_found',
 *   message: 'User with ID 123 not found',
 * });
 * ```
 */
export function createApiError(message: string, status: number, data?: ApiErrorData): ApiError {
  return {
    name: 'ApiError',
    message,
    status,
    data,
  };
}

/**
 * Type guard to check if an unknown value is an ApiError.
 *
 * @param error - The value to check.
 * @returns True if the value matches the ApiError shape, false otherwise.
 */
export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== 'object' || error === null) return false;

  const err = error as Partial<ApiError>;
  return (
    err.name === 'ApiError' && typeof err.message === 'string' && typeof err.status === 'number'
  );
}
