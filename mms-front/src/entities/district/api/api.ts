import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiDistrictData, ApiDistrictRequest } from './types';

export const getDistrictList = ({ region }: ApiDistrictRequest) => {
  return api.get<any, ApiResponseData<ApiDistrictData>>(routes.getDistrictList(), {
    params: {
      region,
    },
  });
};
