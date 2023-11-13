import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { docListAtom, setDocListAtom } from './atoms';

export const useDocList = () => {
  return useAtomValue(docListAtom);
};

export const useSetDocList = () => {
  return useSetAtom(setDocListAtom);
};

export const useResetDocList = () => {
  return useResetAtom(docListAtom);
};
