import { useEffect } from 'react';

import { Box, Button } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { useNotification } from '~shared/ui';

import {
  IStatusType,
  StatusSelector,
  useSetStatus,
  useSetStatusList,
  useStatus,
  useStatusList,
} from '~entities/status';
import { IChallengerList } from '~entities/challengerList';
import { useUser } from '~entities/user';

import { updateStatus } from '../../api';
export interface StatusEditViewProps {
  id: number;
  challenger: IChallengerList;
}

export const StatusEditView: React.FC<StatusEditViewProps> = ({ id, challenger }) => {
  const { t } = useTranslation();

  const notification = useNotification();
  const user = useUser();

  const statusList = useStatusList();
  const status = useStatus();
  const setStatus = useSetStatus();
  const setStatusList = useSetStatusList();

  useEffect(() => {
    if (statusList === null) {
      setStatusList();
    }
  }, [statusList, setStatusList]);

  const changeStatus = (value: IStatusType) => {
    setStatus({ status: value });
  };

  const handleUpdate = () => {
    if (!status || !id) {
      notification.openNotification({ message: t('cm:notify.full'), type: 'warning' });

      return;
    }

    updateStatus({
      id,
      status: status,
    })
      .then(({ data, error }) => {
        if (error && data === false) {
          return;
        }

        notification.openNotification({ message: t('cm:notify.succesSaved'), type: 'success' });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  return (
    <>
      {notification.contextHolder}
      <div className="grid gap-5 min-w-[400px]">
        <StatusSelector
          onStatusSelect={changeStatus}
          value={status ? status : { value: challenger.id_status, label: challenger.status }}
          required
          label="Статус"
          statusList={statusList || []}
          disabled={challenger.id_status === 2 && user?.type === 3}
        />

        <div className="flex justify-end">
          <Button disabled={!status} onClick={handleUpdate}>
            {t('cm:actions.save')}
          </Button>
        </div>
      </div>
    </>
  );
};
