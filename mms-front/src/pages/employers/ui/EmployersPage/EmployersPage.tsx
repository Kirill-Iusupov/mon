import { useAtom } from 'jotai';
import { FC, lazy, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';

import { useUser } from '~entities/user';
import { getPersonal } from '~entities/employers/api';
import { dataAtom } from '~entities/employers/model';
import { i18n } from '~shared/lib/i18n';

export interface EmployersPageProps {}

const AdminTablePage = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminTablePage }))
);

const UserTablePage = lazy(() =>
  import('./user').then((module) => ({ default: module.UserTablePage }))
);

export const EmployersPage: FC<EmployersPageProps> = () => {
  const user = useUser();
  const { t } = i18n;

  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    setData(getPersonal());
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.employers')}</title>
      </Helmet>
      {user?.type === 1 ? <AdminTablePage data={data} /> : <UserTablePage data={data} />}
    </>
  );
};
