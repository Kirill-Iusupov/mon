import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { filterStatusAtom, setFilterStatusAtom } from './atoms';

export const useFilterStatus = () => {
  return useAtomValue(filterStatusAtom);
};

export const useSetFilterStatus = () => {
  return useSetAtom(setFilterStatusAtom);
};

export const useResetFilterStatus = () => {
  return useResetAtom(filterStatusAtom);
};
