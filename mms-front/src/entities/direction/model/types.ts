export type IdDirectionType = number;
export interface DirectionItem {
  id_direction: IdDirectionType;
  direction: string;
  quota: number;
}

export interface DirectionList extends Array<DirectionItem> {}
