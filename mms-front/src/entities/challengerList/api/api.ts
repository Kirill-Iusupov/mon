import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiChallengerListData } from './types';

export const getChallengerList = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiChallengerListData>>(routes.getChallengerList());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
