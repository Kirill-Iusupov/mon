import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getPhoto } from '../api';

import { Photo } from './types';
import { defaultAvatar } from './const';

export const photoAtom = atomWithDefault<Photo | null>((_get) => null);

export const setPhotoAtom = atom<Photo | null, undefined, Promise<void>>(
  (get) => get(photoAtom),
  async (_get, set) => {
    const response = await getPhoto();

    if (response.data?.error) {
      set(photoAtom, defaultAvatar);
    } else if (response.data[0] && response.data[0]?.photo) {
      const photo = response.data[0]?.photo;
      // const buffer = Buffer.from(photo.data);
      // const base64String = buffer.toString('base64');
      const base64String = btoa(
        new Uint8Array(photo.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      localStorage.setItem('image', JSON.stringify(base64String));

      const srcBlob = 'data:image/jpeg;base64,' + base64String;
      set(photoAtom, srcBlob);
    }
  }
);
