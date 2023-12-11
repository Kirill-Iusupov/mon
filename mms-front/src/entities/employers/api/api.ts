import { ApiResponseData, api } from '~shared/api';

export const getPersonal = async () => {
  let response;

  try {
    response = await api.get('/personal');
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response?.data;
};
