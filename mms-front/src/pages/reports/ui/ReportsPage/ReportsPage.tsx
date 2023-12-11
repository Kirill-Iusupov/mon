import { useAtom } from 'jotai';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { reportAtom } from '~entities/reports';
import { Report, ReportInfo } from '~features/reports';

import { i18n } from '~shared/lib/i18n';
import { Button } from '~shared/ui';

export interface TablePageProps {}

export const ReportsPage: FC<TablePageProps> = () => {
  // const user = useUser();
  const { t } = i18n;

  const [data, setData] = useAtom(reportAtom);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const type = e.target.type;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { ...otherProps } = data;
  const canSave = [...Object.values(otherProps)].every(Boolean);

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.reports')}</title>
      </Helmet>
      <ReportInfo data={data} handleChange={handleChange} />
      <Button disabled={!canSave}>Add</Button>
      {/* {canSave ? <Report data={data} /> : null} */}
      <Report data={data} />
    </>
  );
};
