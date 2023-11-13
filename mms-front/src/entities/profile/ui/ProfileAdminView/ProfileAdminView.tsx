import { FC, ReactNode } from 'react';

import { useTranslation } from '~shared/lib/i18n/i18n';
import { dayjs } from '~shared/lib/time';

import { Avatar, Box, SN } from '~shared/ui';

import { Profile } from '../../model';

import styles from './profile.module.scss';

export interface ProfileAdminViewProps {
  profile: Profile | null;
  editSlot: ReactNode;
}

export const ProfileAdminView: FC<ProfileAdminViewProps> = ({ profile, editSlot }) => {
  const { t } = useTranslation();
  const baseUrl = 'http://mon.sc.on.kg/elumutu/api/chal/photo/lg/';

  return (
    <Box>
      <div className="flex justify-between gap-4 sm:flex-col w-full">
        <div className={styles.wrapper}>
          <div>
            <Avatar
              alt="challengerPhoto"
              src={profile?.foto ? baseUrl + profile?.foto : null}
              size={140}
              shape="square"
            >
              <SN surname={profile?.surname} name={profile?.name} size={48} />
            </Avatar>
          </div>
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
        {editSlot}
      </div>
    </Box>
  );
};
