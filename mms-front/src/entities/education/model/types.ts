export type IEducationType = number;

export interface EducationItem {
  id_education_level: IEducationType;
  education_level: string;
}

export interface EducationList extends Array<EducationItem> {}
