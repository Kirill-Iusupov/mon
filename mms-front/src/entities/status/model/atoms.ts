import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getStatus } from '../api';

import { IStatusType, StatusList } from './types';

export const statusAtom = atomWithDefault<IStatusType | null>((_get) => null);
export const filterStatusAtom = atomWithDefault<IStatusType | 0>((_get) => 0);
export const statusListAtom = atomWithDefault<StatusList | null>((_get) => null);

export const setStatusAtom = atom<IStatusType | null, { status: IStatusType }, Promise<void>>(
  (get) => get(statusAtom),
  async (_get, set, { status }) => set(statusAtom, status)
);

export const setFilterStatusAtom = atom<IStatusType, { status: IStatusType }, Promise<void>>(
  (get) => get(filterStatusAtom),
  async (_get, set, { status }) => set(filterStatusAtom, status)
);

export const setStatusListAtom = atom<StatusList | null, undefined, Promise<void>>(
  (get) => get(statusListAtom),
  async (_get, set) => {
    const response = await getStatus();

    if (response.data?.error) {
      set(statusListAtom, null);
    } else if (response.data) {
      set(statusListAtom, response.data);
    }
  }
);
