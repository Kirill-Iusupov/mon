import { atom } from '~shared/lib/atom-state';

export const collapsedAtom = atom<boolean>(true);

export const setCollapsedAtom = atom<boolean, boolean, Promise<void>>(
  false,
  async (_get, set, state) => {
    set(collapsedAtom, state);
  }
);
