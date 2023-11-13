export interface IUniversity {
  id_challenger_text: number | null;
  university: string;
  speciality: string;
  essay: string;
  additional: string;
}

export interface IUniversityParams {
  role: number;
  id: number;
}
