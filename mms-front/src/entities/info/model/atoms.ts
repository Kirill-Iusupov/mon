import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getInfo } from '../api';

import { IInfo, IInfoParams } from './types';

export const infoAtom = atomWithDefault<IInfo | null>((_get) => null);

export const setInfoAtom = atom<IInfo | null, IInfoParams, Promise<void>>(
  (get) => get(infoAtom),
  async (_get, set, { role, id }) => {
    const response = await getInfo(role, id);

    if (response.data?.error) {
      set(infoAtom, null);
    } else if (response.data) {
      set(infoAtom, response.data);
    }
  }
);
