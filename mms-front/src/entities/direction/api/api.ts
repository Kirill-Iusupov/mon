import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiDirectionData, ApiDirectionRequest } from './types';

export const getDirectionList = ({ education }: ApiDirectionRequest) => {
  return api.get<any, ApiResponseData<ApiDirectionData>>(routes.getDirectionList(), {
    params: {
      education,
    },
  });
};
