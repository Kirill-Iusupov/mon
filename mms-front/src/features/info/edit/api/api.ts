import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiInfoUpdateData, ApiInfoUpdateResponseData } from './types';

export const updateInfo = async (data: ApiInfoUpdateData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiInfoUpdateResponseData>>(
      routes.updateInfo(),
      data
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
