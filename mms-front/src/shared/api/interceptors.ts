// import { LocalStorageCache } from '~shared/lib/cache';

import { ApiError, ApiRequestConfig, ApiResponse } from './types';

export const errorHandler = (err: ApiError) => {
  console.error('[Error handler]:', err);
  console.error(err);

  if (err.response?.status === 401) {
    // todo: redirect to login page OR show login modal

    // LocalStorageCache.flush();
    localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    localStorage.removeItem(import.meta.env.VITE_TOKEN_TTL);

    if (window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
  }

  return Promise.reject(err);
};

export const requestHandler = (config: ApiRequestConfig) => {
  const headers = config.headers || {};

  const tokenValue = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
  const tokenTTL = localStorage.getItem(import.meta.env.VITE_TOKEN_TTL);

  if (tokenValue && tokenTTL) {
    if (new Date(JSON.parse(tokenTTL)) > new Date()) {
      headers.Authorization = JSON.parse(tokenValue);
    }
  }

  return { ...config, headers };
};

export const createAuthenticatedRequestHandler = (token: string) => (config: ApiRequestConfig) => {
  const headers = config.headers || {};

  headers.Authorization = token;

  return { ...config, headers };
};

export const responseHandler = (res: ApiResponse) => {
  return res.data;
};
