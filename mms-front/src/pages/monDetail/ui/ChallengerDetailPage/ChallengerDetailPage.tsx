import { FC, useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import { useChallengerList, useSetChallengerList } from '~entities/challengerList';
import { useResetDocList } from '~entities/doc';
import { useResetInfo } from '~entities/info';
import { useResetProfile } from '~entities/profile';
import { useResetUniversity } from '~entities/university';
import { i18n } from '~shared/lib/i18n';
import { useParams } from '~shared/lib/router';
import { DocData } from '~widgets/doc';
import { InfoAdminData } from '~widgets/info';
import { PersonalAdminData, PersonalData } from '~widgets/profile';
import { UniversityData } from '~widgets/university';
import { Box, Collapse, FileButton, Tabs, TabsProps, useWindowInnerWidth } from '~shared/ui';
import { StatusEditView } from '~features/status';
import { useResetStatus } from '~entities/status';

export interface ChallengerDetailProps {}

export const ChallengerDetailPage: FC<ChallengerDetailProps> = () => {
  const windowWidth = useWindowInnerWidth();
  const { t } = i18n;
  const { id } = useParams();
  const chalList = useChallengerList();
  const setChalList = useSetChallengerList();

  const resetInfo = useResetInfo();
  const resetDoc = useResetDocList();
  const resetUniversity = useResetUniversity();
  const resetProfile = useResetProfile();
  const resetStatus = useResetStatus();

  const resetPrevChal = useCallback(() => {
    resetInfo();
    resetDoc();
    resetUniversity();
    resetProfile();
  }, [resetDoc, resetInfo, resetProfile, resetUniversity]);

  useEffect(() => {
    return () => {
      setChalList();
    };
  }, [setChalList]);

  const challenger = useMemo(() => {
    if (!id) {
      return null;
    }

    resetPrevChal();
    const chal = chalList?.filter((x) => x.id_challenger === parseInt(id))[0];
    resetStatus();

    return chal;
  }, [id, resetPrevChal, chalList, resetStatus]);

  if (!id || !challenger) {
    return null;
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span>{t('pages.personal')}</span>,
      children: (
        <div className="grid gap-6 mt-5 md:gap-5 sm:gap-4">
          <PersonalData id={parseInt(id)} />
        </div>
      ),
    },
    {
      key: '2',
      label: <span>{t('pages.info')}</span>,
      children: (
        <div className="grid gap-6 mt-5 md:gap-5 sm:gap-4">
          <InfoAdminData id={parseInt(id)} />
        </div>
      ),
    },
    {
      key: '3',
      label: <span>{t('pages.university')}</span>,
      children: (
        <div className="grid gap-6 mt-5 md:gap-5 sm:gap-4">
          <UniversityData id={parseInt(id)} />
        </div>
      ),
    },
    {
      key: '4',
      label: <span>{t('pages.doc')}</span>,
      children: (
        <div className="grid gap-6 mt-5 md:gap-5 sm:gap-4">
          <DocData id={parseInt(id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('cm:pages.challengerDetail')}</title>
      </Helmet>
      <PersonalAdminData
        id={parseInt(id)}
        editSlot={<StatusEditView id={parseInt(id)} challenger={challenger} />}
        pdfSlot={<FileButton title="PDF" href={`/elumutu/api/chal/export/${id}`} target="_blank" />}
      />

      {windowWidth > 768 ? (
        //if is desktop
        <Box>
          <Tabs className="-mt-5" defaultActiveKey="1" items={items} size="large" />
        </Box>
      ) : (
        //if is mobile
        <Box padding={0}>
          <Collapse accordion defaultActiveKey={['1']} size="large" expandIconPosition="right">
            {items?.map((item) => {
              return (
                <Collapse.Panel key={item.key} header={item.label}>
                  {item.children}
                </Collapse.Panel>
              );
            })}
          </Collapse>
        </Box>
      )}
    </>
  );
};
