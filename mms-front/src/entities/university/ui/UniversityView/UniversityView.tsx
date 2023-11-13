import { FC } from 'react';

import { Typography } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';

import { IUniversity } from '../../model';

export interface UniversityViewProps {
  university: IUniversity | null;
}

export const UniversityView: FC<UniversityViewProps> = ({ university }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Typography.Text type="secondary">{t('vuz:nameVuz')}</Typography.Text>
        <Typography.Title level={5}>{university?.university}</Typography.Title>
      </div>
      <div>
        <Typography.Text type="secondary">{t('vuz:speciality')}</Typography.Text>
        <Typography.Title level={5}>{university?.speciality}</Typography.Title>
      </div>
      <div>
        <Typography.Text type="secondary">{t('vuz:esse')}</Typography.Text>
        <Typography.Title level={5}>{university?.essay}</Typography.Title>
      </div>
      <div>
        <Typography.Text type="secondary">{t('vuz:additional')}</Typography.Text>
        <Typography.Title level={5}>{university?.additional}</Typography.Title>
      </div>
    </>
  );
};
