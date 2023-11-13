export interface ApiInfoUpdateData {
  district: number | null;
  address: string;
  education: number | null;
  direction: number | null;
  kg: number;
  ru: number;
  en: number;
  other: number;
}
export interface ApiInfoUpdateResponseData {
  data?: boolean;
  error?: boolean;
}
