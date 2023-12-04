import axios from 'axios';

import { ApiResponseData } from '~shared/api';
import { setAsyncTimeout } from '~shared/lib/utils';

// import { routes } from './routes';

import { ApiSignInData, ApiSignInResponseData } from './types';

// for example purposes
export const signIn = async (data: ApiSignInData) => {
  let response;

  try {
    // response = await api.post<any, ApiResponseData<ApiSignInResponseData>>(routes.signIn(), data);
    response = await axios.post('http://localhost:5000/mms/api/user/login', data);

    // if (data?.email === 'teacher' && data?.password === 'teacher') {
    //   response = {
    //     data: {
    //       authState: {
    //         type: 1,
    //         s: 'Шаршенбаева',
    //         n: 'Асель',
    //         p: 'Кубанычбековна',
    //         exp: Date.now() + 12 * 60 * 60 * 1000,
    //       },
    //       token: 'token',
    //       tokenType: 'cookie',
    //       expiresIn: 4320,
    //     },
    //     message: 'success',
    //     error: false,
    //   };
    // } else if (data?.email === 'student' && data?.password === 'student') {
    //   response = {
    //     data: {
    //       authState: {
    //         type: 2,
    //         s: 'Асанов',
    //         n: 'Асан',
    //         p: 'Асанович',
    //         exp: Date.now() + 12 * 60 * 60 * 1000,
    //       },
    //       token: 'token',
    //       tokenType: 'cookie',
    //       expiresIn: 4320,
    //     },
    //     message: 'success',
    //     error: false,
    //   };
    // } else {
    //   response = { data: false, message: 'getUserError', error: true };
    // }

    // const token = response.data.token;
    // api.interceptors.request.use(createAuthenticatedRequestHandler(token, 'signIn'));
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response.data;
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
