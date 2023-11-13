import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiStatusData } from './types';

export const getStatus = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiStatusData>>(routes.getStatus());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
