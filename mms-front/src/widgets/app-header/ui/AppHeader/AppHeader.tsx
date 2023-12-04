import { FC } from 'react';
import { useLocation } from 'react-router';

import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';
import { Header } from '~shared/ui';

export interface AppHeaderProps extends Partial<ComponentWithChild> {}

export const AppHeader: FC<AppHeaderProps> = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const pageKey =
    Object.keys(RoutesUrls)[Object.values(RoutesUrls).indexOf(location.pathname as any)];

  // /* eslint-disable no-console */
  // console.warn(pageKey);

  return <Header children={t(`cm:pages.${pageKey}`) as string} />;
};
