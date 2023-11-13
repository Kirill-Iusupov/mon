import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiProfileUpdateData, ApiProfileUpdateResponseData } from './types';

export const updateProfile = async (data: ApiProfileUpdateData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiProfileUpdateResponseData>>(
      routes.updateProfile(),
      data
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
