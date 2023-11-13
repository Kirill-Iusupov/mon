import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiProfileData } from './types';

export const getProfile = (role: number, id: number = 0) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiProfileData>>(
      role === 1 ? routes.getProfile() : routes.getProfileAdmin(id)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
