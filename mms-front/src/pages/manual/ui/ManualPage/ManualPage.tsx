import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';

export interface ManualPageProps {}

export const ManualPage: FC<ManualPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.manual')}</title>
      </Helmet>
      <div>ManualPage</div>
    </>
  );
};
