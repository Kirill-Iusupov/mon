import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getUniversity } from '../api';

import { IUniversity, IUniversityParams } from './types';

export const universityAtom = atomWithDefault<IUniversity | null>((_get) => null);

export const setUniversityAtom = atom<IUniversity | null, IUniversityParams, Promise<void>>(
  (get) => get(universityAtom),
  async (_get, set, { role, id }) => {
    const response = await getUniversity(role, id);

    if (response.data?.error) {
      set(universityAtom, null);
    } else if (response.data) {
      set(universityAtom, response.data[0]);
    }
  }
);
