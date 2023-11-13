export interface IStatus {
  id_status: number;
  status: string;
}
export interface ApiStatusData {
  data?: IStatus;
  error?: boolean;
}
