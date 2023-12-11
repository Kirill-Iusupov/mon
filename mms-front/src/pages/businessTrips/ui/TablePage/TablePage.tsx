import { FC, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAtom } from 'jotai';

import { i18n } from '~shared/lib/i18n';
import { useUser } from '~entities/user';
import { dataAtom, getTrips } from '~entities/businessTrip';

const AdminTablePage = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminTablePage }))
);

const EmployerTablePage = lazy(() =>
  import('./employer').then((module) => ({ default: module.EmployerTablePage }))
);

export interface TablePageProps {}

export const TablePage: FC<TablePageProps> = () => {
  const user = useUser();
  const { t } = i18n;

  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    setData(getTrips());
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.businessTrips')}</title>
      </Helmet>
      {user?.type === 1 ? <AdminTablePage data={data} /> : <EmployerTablePage data={data} />}
    </>
  );
};
