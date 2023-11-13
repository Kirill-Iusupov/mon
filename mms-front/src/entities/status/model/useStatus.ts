import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { setStatusAtom, statusAtom } from './atoms';

export const useStatus = () => {
  return useAtomValue(statusAtom);
};

export const useSetStatus = () => {
  return useSetAtom(setStatusAtom);
};

export const useResetStatus = () => {
  return useResetAtom(statusAtom);
};
