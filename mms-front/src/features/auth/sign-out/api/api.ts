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

  localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
  localStorage.removeItem(import.meta.env.VITE_TOKEN_TTL);

  return response;
};
