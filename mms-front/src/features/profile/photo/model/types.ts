import { ApiPhotoUpdateData } from '../api/types';

export interface PhotoUpdateValues {
  selectedFile: File;
}

export interface ProfileUpdateData extends ApiPhotoUpdateData {}
