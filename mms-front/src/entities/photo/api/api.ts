import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiPhotoData } from './types';

export const getPhoto = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiPhotoData>>(routes.getPhoto());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
