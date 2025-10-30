export interface BusinessErrorData {
  message: string;
}

export class BusinessError extends Error {
  public readonly type = 'BusinessError';

  constructor(data: BusinessErrorData) {
    super(data.message);
    this.name = 'BusinessError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BusinessError);
    }
  }
}

export function isBusinessError(error: unknown): error is BusinessError {
  return (
    error instanceof BusinessError ||
    (typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      (error as { type: unknown }).type === 'BusinessError')
  );
}
