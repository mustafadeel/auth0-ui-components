import type { ApiErrorData } from './types';

/**
 * Custom error class for API-related errors
 * Extends native Error with HTTP status and structured data
 *
 * @example
 * ```ts
 * throw new ApiError('Not Found', 404, {
 *   code: 'user_not_found',
 *   message: 'User with ID 123 not found'
 * });
 * ```
 */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly data?: ApiErrorData,
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
