import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { educationListAtom, setEducationListAtom } from './atoms';

export const useEducationList = () => {
  return useAtomValue(educationListAtom);
};

export const useSetEducationList = () => {
  return useSetAtom(setEducationListAtom);
};

export const useResetEducationList = () => {
  return useResetAtom(educationListAtom);
};
