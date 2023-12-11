import { ApiResponseData, api } from '~shared/api';

export const getTrips = async () => {
  let response;

  try {
    response = await api.get('/business');
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response?.data;
};
