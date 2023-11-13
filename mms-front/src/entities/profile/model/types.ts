export interface Profile {
  surname: string;
  name: string;
  patronymic: string;
  id_status: number;
  status: string;
  foto: string | null;
  pin: number;
  gender: string;
  birth_day: Date;
  passport: string;
  passport_day: Date;
  telephone: string;
  email: string;
}
export interface IProfileParams {
  role: number;
  id: number;
}
