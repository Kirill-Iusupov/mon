import { FC, lazy } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';

import { useUser } from '~entities/user';

const AdminTablePage = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminTablePage }))
);

const EmployerTablePage = lazy(() =>
  import('./employer').then((module) => ({ default: module.EmployerTablePage }))
);

export interface TablePageProps {}

const data = [
  {
    id: 1,
    name: 'John Doe',
  },
];

export const ReportsPage: FC<TablePageProps> = () => {
  const user = useUser();
  const { t } = i18n;

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.reports')}</title>
      </Helmet>
      {user?.type === 1 ? <AdminTablePage data={data} /> : <EmployerTablePage data={data} />}
    </>
  );
};
