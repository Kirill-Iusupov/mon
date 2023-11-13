import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { setUniversityAtom, universityAtom } from './atoms';

export const useUniversity = () => {
  return useAtomValue(universityAtom);
};

export const useSetUniversity = () => {
  return useSetAtom(setUniversityAtom);
};

export const useResetUniversity = () => {
  return useResetAtom(universityAtom);
};
