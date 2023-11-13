import { FC } from 'react';

import { Box, Button, FileIcon, Line } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';

import styles from './styles.module.scss';

export const Regulations: FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <div className="flex justify-between items-center">
        <div className="flex gap-[24px]">
          <FileIcon />
          <div className="text-[16px] font-bold">{t('cm:regulations.Selection')}</div>
        </div>
        <Button type="link" className={styles.button} href="/doc/otbor.pdf" target="_blank">
          {t('cm:regulations.Open')}
        </Button>
      </div>
      <Line />
      <div className="flex justify-between items-center">
        <div className="flex gap-[24px]">
          <FileIcon />
          <div className="text-[16px] font-bold">{t('cm:regulations.Ukaz')}</div>
        </div>
        <Button type="link" className={styles.button} href="/doc/ukaz.pdf" target="_blank">
          {t('cm:regulations.Open')}
        </Button>
      </div>
      <Line />
      <div className="flex justify-between items-center">
        <div className="flex gap-[24px]">
          <FileIcon />
          <div className="text-[16px] font-bold">{t('cm:regulations.Decret')}</div>
        </div>
        <Button type="link" className={styles.button} href="/doc/postanovlenie.pdf" target="_blank">
          {t('cm:regulations.Open')}
        </Button>
      </div>
      <Line />
      <div className="flex justify-between items-center">
        <div className="flex gap-[24px]">
          <FileIcon />
          <div className="text-[16px] font-bold">{t('cm:regulations.Rules')}</div>
        </div>
        <Button type="link" className={styles.button} href="/doc/pravila.pdf" target="_blank">
          {t('cm:regulations.Open')}
        </Button>
      </div>
    </Box>
  );
};
