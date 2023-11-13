import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiLinksData } from './types';

export const getDataFill = () => {
  let response;

  try {
    response = api.post<any, ApiResponseData<ApiLinksData>>(routes.getDataFill());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
