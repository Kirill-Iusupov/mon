import { ApiResponseData, api, createAuthenticatedRequestHandler } from '~shared/api';
import { setAsyncTimeout } from '~shared/lib/utils';

import { routes } from './routes';
import { ApiSignInResponseData } from './types';

export const getUser = async () => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiSignInResponseData>>(routes.getUserData());
  } catch (error: any) {
    response = error?.response?.data;
    localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    localStorage.removeItem(import.meta.env.VITE_TOKEN_TTL);
  }

  return response;
};

export const mockGetUser = async () => {
  let result: unknown = null;

  await setAsyncTimeout(() => {
    result = {
      data: {
        authState: {
          type: 1,
          s: 'Стакеева',
          n: 'Чолпон',
          p: 'Аскаровна',
          exp: 1685229785758,
        },
        token: 'token',
        tokenType: 'cookie',
        expiresIn: 59,
      },
    };
  }, 1000);

  return result as ApiResponseData<ApiSignInResponseData>;
};
