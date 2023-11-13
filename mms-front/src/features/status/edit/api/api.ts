import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiStatusUpdateData, ApiStatusUpdateResponseData } from './types';

export const updateStatus = async (data: ApiStatusUpdateData) => {
  let response;

  try {
    response = await api.put<any, ApiResponseData<ApiStatusUpdateResponseData>>(
      routes.updateStatus(),
      data
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
