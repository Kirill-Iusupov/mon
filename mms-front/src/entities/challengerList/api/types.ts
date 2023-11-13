export interface ApiChallengerListData {
  id_challenger: number;
  surname: string;
  name: string;
  patronymic: string | null;
  age: number;
  id_education_level: number | null;
  education_level: string | null;
  id_direction: number | null;
  direction: string | null;
  id_status: number;
  status: string;
  info: number | null;
  univ: number | null;
  doc: number | null;
  university: string;
  speciality: string;
}
