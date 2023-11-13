import { FC, useEffect } from 'react';

import { UniversityView, useSetUniversity, useUniversity } from '~entities/university';
import { useUser } from '~entities/user';
import { useNotification } from '~shared/ui';
// import { useTranslation } from '~shared/lib/i18n/i18n';

export interface UniversityDataProps extends Partial<ComponentWithChild> {
  id?: number;
}

export const UniversityData: FC<UniversityDataProps> = ({ id = 0 }) => {
  // const { t } = useTranslation();

  const university = useUniversity();
  const setUniversity = useSetUniversity();
  const notification = useNotification();
  const user = useUser();

  useEffect(() => {
    if (!university) {
      if (user?.type) {
        setUniversity({ role: user?.type, id });
      }
    }
  }, [setUniversity, university, user, id]);

  if (!user?.type) {
    return null;
  }

  return (
    <>
      {notification.contextHolder}
      <UniversityView university={university} />
    </>
  );
};
