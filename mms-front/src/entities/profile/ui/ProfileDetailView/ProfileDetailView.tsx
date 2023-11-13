import { FC } from 'react';

import { Box, Line, Typography } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { dayjs } from '~shared/lib/time';

import { Profile } from '../../model';

export interface ProfileDetailViewProps {
  profile: Profile | null;
}

export const ProfileDetailView: FC<ProfileDetailViewProps> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-[18px]">{t('profile:personalData')}</h3>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:gap-4">
        <div>
          <Typography.Text type="secondary">{t('profile:surname')}</Typography.Text>
          <Typography.Title level={5}>{profile?.surname}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('profile:name')}</Typography.Text>
          <Typography.Title level={5}>{profile?.name}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('profile:patronymic')}</Typography.Text>
          <Typography.Title level={5}>{profile?.patronymic}</Typography.Title>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:gap-4">
        <div>
          <Typography.Text type="secondary">{t('profile:pol')}</Typography.Text>
          <Typography.Title level={5}>{profile?.gender}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('profile:bdate')}</Typography.Text>
          <Typography.Title level={5}>
            {dayjs(profile?.birth_day).format('DD/MMMM/YYYY')}
          </Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('profile:pin')}</Typography.Text>
          <Typography.Title level={5}>{profile?.pin}</Typography.Title>
        </div>
      </div>

      <Line />

      <h3 className="text-[18px]">{t('profile:passportData')}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-1 sm:gap-4">
        <div>
          <Typography.Text type="secondary">{t('profile:passport')}</Typography.Text>
          <Typography.Title level={5}>{profile?.passport}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('profile:passportDate')}</Typography.Text>
          <Typography.Title level={5}>
            {dayjs(profile?.passport_day).format('DD/MMMM/YYYY')}
          </Typography.Title>
        </div>
      </div>
    </>
  );
};
