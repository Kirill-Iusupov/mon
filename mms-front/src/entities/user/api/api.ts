import { ApiResponseData, api } from '~shared/api';
import { setAsyncTimeout } from '~shared/lib/utils';

// import { routes } from './routes';
import { ApiUserData } from './types';

export const getUser = async () => {
  let response;

  try {
    // response = await api.post<any, ApiResponseData<ApiUserData>>(routes.getUserData());

    response = {
      data: {
        authState: {
          type: 1,
          s: 'Шаршенбаева',
          n: 'Асель',
          p: 'Кубанычбековна',
          exp: Date.now() + 12 * 60 * 60 * 1000,
        },
        token: 'token',
        tokenType: 'cookie',
        expiresIn: 4320,
      },
      message: 'success',
      error: false,
    };
  } catch (error: any) {
    response = error?.response?.data;
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

  return result as ApiResponseData<ApiUserData>;
};
