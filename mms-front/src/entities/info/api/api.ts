import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiInfoData } from './types';

export const getInfo = (role: number, id: number = 0) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiInfoData>>(
      role === 1 ? routes.getInfo() : routes.getInfoAdmin(id)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
