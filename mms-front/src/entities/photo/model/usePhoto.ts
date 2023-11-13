import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { photoAtom, setPhotoAtom } from './atoms';

export const usePhoto = () => {
  return useAtomValue(photoAtom);
};

export const useSetPhoto = () => {
  return useSetAtom(setPhotoAtom);
};

export const useResetPhoto = () => {
  return useResetAtom(photoAtom);
};
