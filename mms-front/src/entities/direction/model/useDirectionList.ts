import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { directionListAtom, setDirectionListAtom } from './atoms';

export const useDirectionList = () => {
  return useAtomValue(directionListAtom);
};

export const useSetDirectionList = () => {
  return useSetAtom(setDirectionListAtom);
};

export const useResetDirectionList = () => {
  return useResetAtom(directionListAtom);
};
