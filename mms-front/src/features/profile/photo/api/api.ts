import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiPhotoUpdateData, ApiPhotoUpdateResponseData } from './types';

export const updatePhoto = async (data: ApiPhotoUpdateData) => {
  let response;
  const formData = new FormData();
  formData.append('file', data.selectedFile);

  try {
    response = await api.post<any, ApiResponseData<ApiPhotoUpdateResponseData>>(
      routes.updatePhoto(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
