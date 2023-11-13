export interface PhotoType {
  type: string;
  data: Array<number>;
}
export interface ApiPhotoData {
  photo?: PhotoType;
  error?: boolean;
}
