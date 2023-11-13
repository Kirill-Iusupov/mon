export interface ApiDirectionRequest {
  education: number | null;
}
export interface ApiDirectionItem {
  id_direction: number;
  direction: string;
  quota: number;
}
export interface ApiDirectionData extends Array<ApiDirectionItem> {}
