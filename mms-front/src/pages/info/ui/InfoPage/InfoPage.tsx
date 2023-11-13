import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { InfoData } from '~widgets/info';

export interface InfoPageProps {}

export const InfoPage: FC<InfoPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.info')}</title>
      </Helmet>
      <InfoData />
    </>
  );
};
