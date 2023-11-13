import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { ApiDistrictRequest, getDistrictList } from '../api';

import { DistrictList, IdDistrictType } from './types';

export const districtAtom = atomWithDefault<IdDistrictType | null>((_get) => null);
export const districtListAtom = atomWithDefault<DistrictList | null>((_get) => null);

export const setDistrictAtom = atom<
  IdDistrictType | null,
  { idDistrict: IdDistrictType },
  Promise<void>
>(
  (get) => get(districtAtom),
  async (_get, set, { idDistrict }) => set(districtAtom, idDistrict)
);

export const setDistrictListAtom = atom<DistrictList | null, ApiDistrictRequest, Promise<void>>(
  (get) => get(districtListAtom),
  async (_get, set, { region }) => {
    const response = await getDistrictList({ region });
    const districtList = response.data;
    set(districtListAtom, districtList);
  }
);
