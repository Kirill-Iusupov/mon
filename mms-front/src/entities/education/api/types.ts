export interface IEducation {
  id_education_level: number;
  education_level: string;
}
export interface ApiEducationData {
  data?: IEducation;
  error?: boolean;
}
