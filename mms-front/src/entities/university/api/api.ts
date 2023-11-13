import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiUniversityData } from './types';

export const getUniversity = (role: number, id: number = 0) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiUniversityData>>(
      role === 1 ? routes.getUniversity() : routes.getUniversityAdmin(id)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
