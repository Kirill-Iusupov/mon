import { atom } from 'jotai';

export const locAtom = atom('in');

export const formAtom = atom({
  startDate: '',
  endDate: '',
  city: '',
  country: '',
});
