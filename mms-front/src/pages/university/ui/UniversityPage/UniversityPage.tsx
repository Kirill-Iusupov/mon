import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';

import { Vuz } from '~features/vuz';

export interface UniversityPageProps {}

export const UniversityPage: FC<UniversityPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.university')}</title>
      </Helmet>
      <Vuz />
    </>
  );
};
