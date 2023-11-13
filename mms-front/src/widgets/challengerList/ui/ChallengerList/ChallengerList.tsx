import { FC, useEffect, useState } from 'react';

import {
  ChallengerListItemView,
  IChallengerList,
  useChallStatusList,
  useChallengerList,
  useSetChallengerList,
} from '~entities/challengerList';
import { RoutesUrls, useNavigate } from '~shared/lib/router';
import { Box, FileButton, Select, useNotification } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { useFilterStatus, useSetFilterStatus } from '~entities/status/model/useFilterStatus';

export interface ChallengerListProps extends Partial<ComponentWithChild> {}

export const ChallengerList: FC<ChallengerListProps> = () => {
  const { t } = useTranslation();

  const chalList = useChallengerList();
  const setChalList = useSetChallengerList();
  const challStatusList = useChallStatusList();
  const notification = useNotification();
  const navigate = useNavigate();

  const filterStatus = useFilterStatus();
  const setFilterStatus = useSetFilterStatus();

  const [filteredList, setFilteredList] = useState<IChallengerList[]>([]);
  const [status, setStatus] = useState<number>(filterStatus);

  useEffect(() => {
    if (!chalList) {
      setChalList();
    } else {
      // setFilteredList(chalList);
      if (filterStatus > 0) {
        const filtered = chalList?.filter((a) => a.id_status === filterStatus);
        setFilteredList(filtered);
      } else {
        setFilteredList(chalList);
      }
    }
  }, [setChalList, chalList, filterStatus]);

  const handleFilter = (value: number) => {
    setStatus(value);
    setFilterStatus({ status: value });

    if (!chalList) {
      return;
    }

    // if (value > 0) {
    //   const filtered = chalList?.filter((a) => a.id_status === value);
    //   setFilteredList(filtered);
    // } else {
    //   setFilteredList(chalList);
    // }
  };

  const goToDetail = (id: number) => {
    navigate(`${RoutesUrls.challengerDetail}/${id}`);
  };

  return (
    <>
      {notification.contextHolder}
      <Box
        title={
          <div className="flex gap-4 justify-between sm:flex-col w-full">
            {t('mon.challengers')}
            <div className="flex gap-4">
              <Select
                className="w-[360px] sm:w-full"
                options={[{ value: 0, label: t('mon.all') }, ...challStatusList]}
                onChange={handleFilter}
                value={status}
              />
              {/* <Button type="link" href={`/elumutu/api/mon/export?s=[${status}]`} target="_blank">
                <div className="flex gap-2"> {pdfIcon()} PDF</div>
              </Button> */}
              <FileButton
                title="PDF"
                href={`/elumutu/api/mon/export?s=[${status === 0 ? '1,2,3,4,5' : status}]`}
                target="_blank"
              />
            </div>
          </div>
        }
      >
        <ChallengerListItemView chalList={filteredList} goToDetail={goToDetail} />
      </Box>
    </>
  );
};
