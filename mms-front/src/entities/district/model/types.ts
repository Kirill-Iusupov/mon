export type IdDistrictType = number;

export interface DistrictItem {
  id_district_city: IdDistrictType;
  district_city: string;
}

export interface DistrictList extends Array<DistrictItem> {}
