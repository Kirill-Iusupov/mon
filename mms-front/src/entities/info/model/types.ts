export interface IInfo {
  id_challenger_info: number;
  id_region: number;
  region: string;
  id_district_city: number;
  district_city: string;
  address: string;
  id_education_level: number;
  education_level: string;
  id_direction: number;
  lan_direction: string;
  kyrgyz: string;
  russian: string;
  english: string;
  other: string;
}

export interface IInfoParams {
  role: number;
  id: number;
}
