import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '~widgets/app-header';
import { Navigation } from '~widgets/navigation';

import { PageLayout } from '~shared/ui';

export interface BaseLayoutProps extends Partial<ComponentWithChildren> {}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <PageLayout navigation={<Navigation />} header={<AppHeader />}>
      <Suspense fallback="loading">
        {children}
        <Outlet />
      </Suspense>
    </PageLayout>
  );
};
