import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { Box } from '~shared/ui';
import { ContactData, PersonalData, PersonalShortData } from '~widgets/profile';

export interface PersonalPageProps {}

export const PersonalPage: FC<PersonalPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.personal')}</title>
      </Helmet>
      <PersonalShortData />
      <Box>
        <PersonalData />
      </Box>
      <ContactData />
    </>
  );
};
