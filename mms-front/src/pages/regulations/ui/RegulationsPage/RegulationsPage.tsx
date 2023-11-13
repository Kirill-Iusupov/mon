import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { Regulations } from '~widgets/regulations';

export interface RegulationsPageProps {}

export const RegulationsPage: FC<RegulationsPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.regulations')}</title>
      </Helmet>
      <Regulations />
    </>
  );
};
