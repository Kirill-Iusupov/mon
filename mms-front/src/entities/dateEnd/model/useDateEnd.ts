import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { dateEndAtom, setDateEndAtom } from './atoms';

export const useDateEnd = () => {
  return useAtomValue(dateEndAtom);
};

export const useSetDateEnd = () => {
  return useSetAtom(setDateEndAtom);
};

export const useResetDateEnd = () => {
  return useResetAtom(dateEndAtom);
};
