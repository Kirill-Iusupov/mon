import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { ApiDirectionRequest, getDirectionList } from '../api';

import { DirectionList, IdDirectionType } from './types';

export const directionAtom = atomWithDefault<IdDirectionType | null>((_get) => null);
export const directionListAtom = atomWithDefault<DirectionList | null>((_get) => null);

export const setDirectionAtom = atom<
  IdDirectionType | null,
  { idDirection: IdDirectionType },
  Promise<void>
>(
  (get) => get(directionAtom),
  async (_get, set, { idDirection }) => set(directionAtom, idDirection)
);

export const setDirectionListAtom = atom<DirectionList | null, ApiDirectionRequest, Promise<void>>(
  (get) => get(directionListAtom),
  async (_get, set, { education }) => {
    const response = await getDirectionList({ education });
    const directionList = response.data;
    set(directionListAtom, directionList);
  }
);
