import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getDateEnd } from '../api';

import { IDateEnd } from './types';

export const dateEndAtom = atomWithDefault<IDateEnd | null>((_get) => null);

export const setDateEndAtom = atom<IDateEnd | null, undefined, Promise<void>>(
  (get) => get(dateEndAtom),
  async (_get, set) => {
    const response = await getDateEnd();

    if (response.data?.error) {
      set(dateEndAtom, null);
    } else if (response.data) {
      set(dateEndAtom, response.data);
    }
  }
);
