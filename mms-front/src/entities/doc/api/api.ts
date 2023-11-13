import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiDocData } from './types';

export const getDoc = (role: number, id: number = 0) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiDocData>>(
      role === 1 ? routes.getDoc() : routes.getDocAdmin(id)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
