import { ApiResponseData, api } from '~shared/api';

export const getSchedule = async () => {
  let response;

  try {
    response = await api.get('/schedule');
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response?.data;
};
