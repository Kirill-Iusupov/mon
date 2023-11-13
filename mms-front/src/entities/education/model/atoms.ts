import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getEducation } from '../api';

import { EducationList, IEducationType } from './types';

export const educationAtom = atomWithDefault<IEducationType | null>((_get) => null);
export const educationListAtom = atomWithDefault<EducationList | null>((_get) => null);

export const setEducationAtom = atom<
  IEducationType | null,
  { education: IEducationType },
  Promise<void>
>(
  (get) => get(educationAtom),
  async (_get, set, { education }) => set(educationAtom, education)
);

export const setEducationListAtom = atom<EducationList | null, undefined, Promise<void>>(
  (get) => get(educationListAtom),
  async (_get, set) => {
    const response = await getEducation();

    if (response.data?.error) {
      set(educationListAtom, null);
    } else if (response.data) {
      set(educationListAtom, response.data);
    }
  }
);
