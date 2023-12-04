export const translateField = (
  lang: string,
  en: string | null,
  kg: string | null,
  ru: string | null
) => {
  return lang === 'en' ? (en ? en : ru + '_en') : lang === 'kg' ? (kg ? kg : ru + '_ky') : ru;
};
