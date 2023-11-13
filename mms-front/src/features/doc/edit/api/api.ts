import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiDocUpdateData, ApiDocUpdateResponseData } from './types';

export const updateDoc = async (data: ApiDocUpdateData) => {
  let response;
  const formData = new FormData();
  formData.append('idDoc', String(data.idDoc));
  formData.append('file', data.selectedFile);
  formData.append('docName', data.selectedFile.name);

  try {
    response = await api.put<any, ApiResponseData<ApiDocUpdateResponseData>>(
      routes.updateDoc(),
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
