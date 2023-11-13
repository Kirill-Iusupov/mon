import { Cookies } from '~shared/lib/utils';

import { ApiError, ApiRequestConfig, ApiResponse } from './types';

export const errorHandler = (err: ApiError) => {
  console.error('[Error handler]:', err);
  console.error(err);

  if (err.response?.status === 401) {
    // todo: redirect to login page OR show login modal

    const cookie = new Cookies();
    const options = {
      domain: window.location.hostname,
      secure: window.location.protocol === 'https:',
    };

    cookie.remove('_auth_state', options);
    cookie.remove('_auth_storage', options);
    cookie.remove('_auth_type', options);
    cookie.remove('_auth', options);
    window.location.replace('/elumutu/login');
  }

  return Promise.reject(err);
};

export const requestHandler = (config: ApiRequestConfig) => {
  const headers = config.headers || {};

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
