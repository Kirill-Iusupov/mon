import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiEducationData } from './types';

export const getEducation = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiEducationData>>(routes.getEducation());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
