import { api } from '~shared/api';

import { routes } from './routes';

export const getUniv = async (lang: string) => {
  const { data } = await api(routes.getUniv(lang));

  return data;
};

export const putUniv = async (
  lang: string,
  university: string,
  essay: string,
  speciality: string,
  additional: string
) => {
  const { data } = await api.put(routes.getUniv(lang), {
    university,
    essay,
    speciality,
    additional,
  });

  return data;
};
