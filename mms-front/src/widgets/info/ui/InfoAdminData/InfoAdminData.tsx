import { FC, useEffect } from 'react';

import { useInfo, useSetInfo } from '~entities/info';
import { useUser } from '~entities/user';
import { InfoView } from '~entities/info';
import { useLangList } from '~entities/lang';

export interface InfoAdminDataProps extends Partial<ComponentWithChild> {
  id: number;
}

export const InfoAdminData: FC<InfoAdminDataProps> = ({ id }) => {
  const user = useUser();
  const info = useInfo();
  const setInfo = useSetInfo();
  const langList = useLangList();

  useEffect(() => {
    if (!info || !user) {
      if (user?.type) {
        setInfo({ role: user?.type, id });
      }
    }
  }, [setInfo, info]);

  return <InfoView info={info} langList={langList} />;
};
