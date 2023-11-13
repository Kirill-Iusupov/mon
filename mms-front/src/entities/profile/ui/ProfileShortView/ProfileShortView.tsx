import { ReactNode } from 'react';

import { Box } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { dayjs } from '~shared/lib/time';

import { useProfile } from '~entities/profile';

import styles from './profile.module.scss';

export interface ProfileShortViewProps {
  PhotoSlot: ReactNode;
}

export const ProfileShortView: React.FC<ProfileShortViewProps> = ({ PhotoSlot }) => {
  const { t } = useTranslation();
  const profile = useProfile();

  return (
    <Box>
      <div className={styles.wrapper}>
        <div>{PhotoSlot}</div>
        <div className={styles.datas}>
          <h3 className={styles.fio}>
            {`${profile?.surname} ${profile?.name} ${profile?.patronymic}`}
          </h3>
          <p className={styles.other}>
            {dayjs(profile?.birth_day).format('DD.MM.YYYY') + ' ' + t('profile:yearShort')}
          </p>
          <p className={styles.other}>{profile?.email}</p>
          <p className={styles.other}>{profile?.telephone}</p>
        </div>
      </div>
    </Box>
  );
};
