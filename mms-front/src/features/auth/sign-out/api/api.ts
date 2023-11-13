import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiSignOutResponseData } from './types';

// for example purposes
export const signOut = async () => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiSignOutResponseData>>(routes.signOut(), {});
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
