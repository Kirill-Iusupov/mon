import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { setStatusListAtom, statusListAtom } from './atoms';

export const useStatusList = () => {
  return useAtomValue(statusListAtom);
};

export const useSetStatusList = () => {
  return useSetAtom(setStatusListAtom);
};

export const useResetStatusList = () => {
  return useResetAtom(statusListAtom);
};
