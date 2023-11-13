import { ApiResponseData, api } from '~shared/api';
import { setAsyncTimeout } from '~shared/lib/utils';

import { routes } from './routes';
import { ApiSignInData, ApiSignInResponseData } from './types';

// for example purposes
export const signIn = async (data: ApiSignInData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiSignInResponseData>>(routes.signIn(), {
      login: data.login,
      password: data.password,
    });
    // const token = response.data.token;
    // api.interceptors.request.use(createAuthenticatedRequestHandler(token, 'signIn'));
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
  // return api.post<any, ApiResponseData<ApiSignInResponseData>>(routes.signIn(), data);
};

export const mockSignIn = async (_data?: ApiSignInData) => {
  let result: unknown = null;

  await setAsyncTimeout(() => {
    result = {
      data: {
        token: 'token',
        expiresIn: 120,
        type: 'Bearer',
      },
    };
  }, 1000);

  return result as ApiResponseData<ApiSignInResponseData>;
};
