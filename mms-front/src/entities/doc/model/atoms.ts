import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getDoc } from '../api';

import { IDoc } from './types';

export const docListAtom = atomWithDefault<IDoc[] | null>((_get) => null);

export const setDocListAtom = atom<IDoc[] | null, { role: number; id: number }, Promise<void>>(
  (get) => get(docListAtom),
  async (_get, set, { role, id }) => {
    const response = await getDoc(role, id);

    if (response.data?.error) {
      set(docListAtom, null);
    } else if (response.data) {
      set(docListAtom, response.data);
    }
  }
);
