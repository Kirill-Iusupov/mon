import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { Box } from '~shared/ui';
import { DocData } from '~widgets/doc';

export interface DocPageProps {}

export const DocPage: FC<DocPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.doc')}</title>
      </Helmet>
      <Box>
        <DocData />
      </Box>
    </>
  );
};
