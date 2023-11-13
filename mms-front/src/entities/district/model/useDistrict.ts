import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { districtAtom, setDistrictAtom } from './atoms';

export const useDistrict = () => {
  return useAtomValue(districtAtom);
};

export const useSetDistrict = () => {
  return useSetAtom(setDistrictAtom);
};

export const useResetDistrict = () => {
  return useResetAtom(districtAtom);
};
