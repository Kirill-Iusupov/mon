import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiLinksData } from './types';

export const getDateEnd = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiLinksData>>(routes.getDateEnd());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
