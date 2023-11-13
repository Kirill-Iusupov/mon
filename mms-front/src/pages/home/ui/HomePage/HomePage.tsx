import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { useUser } from '~entities/user';
import { i18n } from '~shared/lib/i18n';
import { ChallengerList } from '~widgets/challengerList';
import { DateEnd } from '~widgets/dataEnd';
import { DataFill } from '~widgets/dataFill';
import { PersonalShortData } from '~widgets/profile';
import { Status } from '~widgets/status';

export interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { t } = i18n;
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.home')}</title>
      </Helmet>
      {user?.type === 1 ? (
        <>
          <PersonalShortData />
          <DataFill />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-5 sm:grid-cols-1 sm:gap-4">
            <Status />
            <DateEnd />
          </div>
        </>
      ) : (
        <ChallengerList />
      )}
    </>
  );
};
