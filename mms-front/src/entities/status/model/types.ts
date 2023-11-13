export type IStatusType = number;

export interface IStatusItem {
  id_status: IStatusType;
  status: string;
}
export interface StatusList extends Array<IStatusItem> {}
