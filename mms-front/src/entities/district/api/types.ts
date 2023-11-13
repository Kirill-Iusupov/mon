export interface ApiDistrictRequest {
  region: number | null;
}
export interface ApiDistrictItem {
  id_district_city: number;
  district_city: string;
}
export interface ApiDistrictData extends Array<ApiDistrictItem> {}
