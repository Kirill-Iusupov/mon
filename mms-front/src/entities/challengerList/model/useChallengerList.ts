import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { challStatusList, challengerListAtom, setChallengerListAtom } from './atoms';

export const useChallengerList = () => {
  return useAtomValue(challengerListAtom);
};

export const useChallStatusList = () => {
  return useAtomValue(challStatusList);
};

export const useSetChallengerList = () => {
  return useSetAtom(setChallengerListAtom);
};

export const useResetChallengerList = () => {
  return useResetAtom(challengerListAtom);
};
