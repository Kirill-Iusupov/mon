import { FC, lazy } from 'react';

import { Helmet } from 'react-helmet-async';

import { useUser } from '~entities/user';
import { i18n } from '~shared/lib/i18n';

export interface SchedulePageProps {}

const data = [
  {
    id: 1,
    name: 'Tamara',
  },
];

const AdminTablePage = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminTablePage }))
);

const UserTablePage = lazy(() =>
  import('./user').then((module) => ({ default: module.UserTablePage }))
);

export const SchedulePage: FC<SchedulePageProps> = () => {
  const user = useUser();
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.schedule')}</title>
      </Helmet>
      {user?.type === 1 ? <AdminTablePage data={data} /> : <UserTablePage data={data} />}
    </>
  );
};
