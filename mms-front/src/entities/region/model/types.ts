export type IRegionType = number;

export interface RegionItem {
  id_region: IRegionType;
  region: string;
}

export interface RegionList extends Array<RegionItem> {}
