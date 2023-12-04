import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { LanguageSettings } from '~widgets/language';

export interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.settings')}</title>
      </Helmet>
      <div className="grid gap-6">
        <LanguageSettings />
      </div>
    </>
  );
};
