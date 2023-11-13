import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { profileAtom, setProfileAtom } from './atoms';

export const useProfile = () => {
  return useAtomValue(profileAtom);
};

export const useSetProfile = () => {
  return useSetAtom(setProfileAtom);
};

export const useResetProfile = () => {
  return useResetAtom(profileAtom);
};
