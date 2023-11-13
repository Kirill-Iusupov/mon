import { ApiDocUpdateResponseData } from '../api/types';

export interface DocUpdateValues {
  idDoc: number;
  selectedFile: File;
}

export interface DocUpdateData extends ApiDocUpdateResponseData {}
