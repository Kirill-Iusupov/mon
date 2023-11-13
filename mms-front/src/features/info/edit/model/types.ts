import { ApiInfoUpdateResponseData } from '../api/types';

export interface InfoUpdateValues {
  district: number;
  address: string;
  education: number;
  direction: number;
  kg: string;
  ru: string;
  en: string;
  other: string;
}

export interface InfoUpdateData extends ApiInfoUpdateResponseData {}
