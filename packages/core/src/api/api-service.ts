import type { RequestOptions, HttpMethod } from './types';
import { createApiError, isApiError } from './api-error';

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
} as const;

async function request<T>(
  endpoint: string,
  method: HttpMethod,
  options: RequestOptions = {},
  enableLogging = false,
): Promise<T> {
  const { body, accessToken } = options;

  const reqHeaders = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const requestInit: RequestInit = {
    method,
    headers: reqHeaders,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  if (enableLogging) {
    console.log(`[APIService] ${method} ${endpoint}`, requestInit);
  }

  try {
    const response = await fetch(endpoint, requestInit);
    const contentType = response.headers.get('content-type') ?? '';

    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const maybeData = data as Record<string, unknown> | undefined;
      const rawMessage = maybeData?.message ?? maybeData?.error;

      const message =
        typeof rawMessage === 'string'
          ? rawMessage
          : STATUS_MESSAGES[response.status] || 'Request failed';

      throw createApiError(message, response.status, data);
    }

    if (enableLogging) {
      console.log(`[APIService] Response from ${endpoint}`, data);
    }

    return data as T;
  } catch (error) {
    if (isApiError(error)) throw error;

    throw createApiError('Network error', 0);
  }
}

export function get<T = unknown>(
  endpoint: string,
  options?: Omit<RequestOptions, 'body'>,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'GET', options, enableLogging);
}

export function post<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'body'>,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'POST', { ...options, body }, enableLogging);
}

export function put<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'body'>,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'PUT', { ...options, body }, enableLogging);
}

export function patch<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'body'>,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'PATCH', { ...options, body }, enableLogging);
}

export function del<T = unknown>(
  endpoint: string,
  options?: Omit<RequestOptions, 'body'>,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'DELETE', options, enableLogging);
}
