import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { educationAtom, setEducationAtom } from './atoms';

export const useEducation = () => {
  return useAtomValue(educationAtom);
};

export const useSetEducation = () => {
  return useSetAtom(setEducationAtom);
};

export const useResetEducation = () => {
  return useResetAtom(educationAtom);
};
