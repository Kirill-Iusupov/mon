import { FC } from 'react';

import { useTranslation } from '~shared/lib/i18n';

import { useDataFill } from '~entities/dataFill';
import { useProfile } from '~entities/profile';
import { Box, ErrorIcon, SuccessIcon, WaitingIcon, WarningIcon } from '~shared/ui';

import styles from './status.module.scss';

export interface StatusProps extends Partial<ComponentWithChild> {}

export const Status: FC<StatusProps> = () => {
  const { t } = useTranslation();
  const dataFill = useDataFill();
  const profile = useProfile();

  if (!dataFill || !profile) {
    return <div>Loading</div>;
  }

  if (
    profile?.id_status === 1 &&
    dataFill?.doc &&
    dataFill?.info &&
    dataFill?.peron &&
    dataFill?.univ
  ) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <WaitingIcon />
          <h3 className={styles.waitingTitle}>{t('Status.waiting')}</h3>
          <p className={styles.discript}>{t('Status.waitingDis')}</p>
        </div>
      </Box>
    );
  }

  if (profile?.id_status === 1) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <WarningIcon />
          <h3 className={styles.warningTitle}>{t('Status.warning')}</h3>
          <p className={styles.discript}>{t('Status.warningDis')}</p>
        </div>
      </Box>
    );
  }

  if (profile?.id_status === 2) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <ErrorIcon />
          <h3 className={styles.rejectTitle}>{profile?.status}</h3>
          <p className={styles.discript}>{t('Status.reject')}</p>
        </div>
      </Box>
    );
  }

  if (profile?.id_status === 3) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <SuccessIcon />
          <h3 className={styles.successTitle}>{profile?.status}</h3>
          <p className={styles.discript}>{t('Status.success1Dis')}</p>
        </div>
      </Box>
    );
  }

  if (profile?.id_status === 4) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <ErrorIcon />
          <h3 className={styles.rejectTitle}>{profile?.status}</h3>
          <p className={styles.discript}>{t('Status.reject2')}</p>
        </div>
      </Box>
    );
  }

  if (profile?.id_status === 5) {
    return (
      <Box>
        <div className={styles.wrapper}>
          <SuccessIcon />
          <h3 className={styles.successTitle}>{profile?.status}</h3>
          <p className={styles.discript}>{t('Status.success2Dis')}</p>
        </div>
      </Box>
    );
  }

  return null;
};
