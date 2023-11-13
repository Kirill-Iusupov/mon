import { FC, useEffect } from 'react';

import { useInfo, useSetInfo } from '~entities/info';
import { useSetEducationList } from '~entities/education';
import { useSetRegionList } from '~entities/region';
import { InfoEditView } from '~features/info';

export interface InfoDataProps extends Partial<ComponentWithChild> {}

export const InfoData: FC<InfoDataProps> = () => {
  const info = useInfo();
  const setInfo = useSetInfo();
  const setRegionList = useSetRegionList();
  const setEducationList = useSetEducationList();

  useEffect(() => {
    if (!info) {
      setInfo({ role: 1, id: 0 });
      setRegionList();
      setEducationList();
    }
  }, [setInfo, info]);

  return <InfoEditView />;
};
