import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getDataFill } from '../api';

import { IDataFill } from './types';

export const dataFillAtom = atomWithDefault<IDataFill | null>((_get) => null);

export const setDataFillAtom = atom<IDataFill | null, undefined, Promise<void>>(
  (get) => get(dataFillAtom),
  async (_get, set) => {
    const response = await getDataFill();

    if (response.data?.error) {
      set(dataFillAtom, null);
    } else if (response.data) {
      set(dataFillAtom, response.data);
    }
  }
);
