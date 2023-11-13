import { ApiProfileUpdateResponseData } from '../api/types';

export interface ProfileUpdateValues {
  telephone: string;
  email: string;
}

export interface ProfileUpdateData extends ApiProfileUpdateResponseData {}
