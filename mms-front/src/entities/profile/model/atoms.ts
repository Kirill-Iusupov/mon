import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getProfile } from '../api';

import { IProfileParams, Profile } from './types';

export const profileAtom = atomWithDefault<Profile | null>((_get) => null);

export const setProfileAtom = atom<Profile | null, IProfileParams, Promise<void>>(
  (get) => get(profileAtom),
  async (_get, set, { role, id }) => {
    const response = await getProfile(role, id);
    const profile = response.data;
    set(profileAtom, profile);
  }
);
