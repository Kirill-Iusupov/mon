import { ApiStatusUpdateResponseData } from '../api/types';

export interface StatusUpdateValues {
  id: number;
  status: number;
}

export interface StatusUpdateData extends ApiStatusUpdateResponseData {}
