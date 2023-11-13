import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { directionAtom, setDirectionAtom } from './atoms';

export const useDirection = () => {
  return useAtomValue(directionAtom);
};

export const useSetDirection = () => {
  return useSetAtom(setDirectionAtom);
};

export const useResetDirection = () => {
  return useResetAtom(directionAtom);
};
