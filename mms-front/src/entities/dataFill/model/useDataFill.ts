import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { dataFillAtom, setDataFillAtom } from './atoms';

export const useDataFill = () => {
  return useAtomValue(dataFillAtom);
};

export const useSetDataFill = () => {
  return useSetAtom(setDataFillAtom);
};

export const useResetDataFill = () => {
  return useResetAtom(dataFillAtom);
};
