import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { districtListAtom, setDistrictListAtom } from './atoms';

export const useDistrictList = () => {
  return useAtomValue(districtListAtom);
};

export const useSetDistrictList = () => {
  return useSetAtom(setDistrictListAtom);
};

export const useResetDistrictList = () => {
  return useResetAtom(districtListAtom);
};
