export interface IDataFill {
  peron: 0 | 1;
  info: 0 | 1;
  doc: 0 | 1;
  univ: 0 | 1;
}

export interface ApiLinksData {
  data?: IDataFill;
  error?: boolean;
}
