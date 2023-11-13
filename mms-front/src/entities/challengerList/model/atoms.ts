import _ from 'lodash';

import { atom, atomWithDefault } from '~shared/lib/atom-state';
// import { groupBy } from '~shared/lib/utils';

import { getChallengerList } from '../api';

import { IChallengerList, IChallengerStatus } from './types';

export const challengerListAtom = atomWithDefault<IChallengerList[] | null>((_get) => null);
export const challStatusList = atomWithDefault<IChallengerStatus[] | []>((_get) => []);

export const setChallengerListAtom = atom<IChallengerList[] | null, undefined, Promise<void>>(
  (get) => get(challengerListAtom),
  async (_get, set) => {
    const response = await getChallengerList();

    if (response.data?.error) {
      set(challengerListAtom, null);
    } else if (response.data) {
      const arr = response.data;

      // const grouped = groupBy(arr, (i) => i.id_status);

      const grouped = _.chain(arr)
        .groupBy('id_status')
        .map((value) => {
          return {
            value: value[0]?.id_status,
            label: value[0]?.status,
          };
        })
        .value();

      set(challengerListAtom, arr);
      set(challStatusList, grouped);
    }
  }
);
