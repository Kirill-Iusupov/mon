import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { infoAtom, setInfoAtom } from './atoms';

export const useInfo = () => {
  return useAtomValue(infoAtom);
};

export const useSetInfo = () => {
  return useSetAtom(setInfoAtom);
};

export const useResetInfo = () => {
  return useResetAtom(infoAtom);
};
