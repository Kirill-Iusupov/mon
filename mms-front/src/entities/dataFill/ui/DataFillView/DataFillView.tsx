import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useTranslation } from '~shared/lib/i18n';
import { Box, ErrorFillIcon, LinkPencilIcon, SuccessFillIcon, Typography } from '~shared/ui';
import { RoutesUrls } from '~shared/lib/router';

import { IDataFill } from '../../api';

import styles from './style.module.scss';

export interface DataFillViewProps {
  dataFill: IDataFill;
}

export const DataFillView: FC<DataFillViewProps> = ({ dataFill }) => {
  const { t } = useTranslation();

  const cellClass = (status: 0 | 1) =>
    classNames(styles.cell, status === 0 ? styles.error : styles.success);

  const statusClass = (status: 0 | 1) =>
    classNames(styles.status, status === 0 ? styles.stError : styles.stSuccess);

  return (
    <Box padding={0}>
      <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        <div className={cellClass(dataFill.peron)}>
          <div className="flex gap-3 justify-between">
            <Typography.Text strong>{t('pages.personal')}</Typography.Text>
            <NavLink to={RoutesUrls.personal}>
              <LinkPencilIcon />
            </NavLink>
          </div>
          <div className={statusClass(dataFill.peron)}>
            {dataFill.peron ? (
              <>
                <SuccessFillIcon /> {t('fillStatus.succes')}
              </>
            ) : (
              <>
                <ErrorFillIcon /> {t('fillStatus.rowError')}
              </>
            )}
          </div>
        </div>

        <div className={cellClass(dataFill.info)}>
          <div className="flex gap-3 justify-between">
            <Typography.Text strong>{t('pages.info')}</Typography.Text>
            <NavLink to={RoutesUrls.info}>
              <LinkPencilIcon />
            </NavLink>
          </div>
          <div className={statusClass(dataFill.info)}>
            {dataFill.info ? (
              <>
                <SuccessFillIcon /> {t('fillStatus.succes')}
              </>
            ) : (
              <>
                <ErrorFillIcon /> {t('fillStatus.rowError')}
              </>
            )}
          </div>
        </div>
        <div className={cellClass(dataFill.doc)}>
          <div className="flex gap-3 justify-between">
            <Typography.Text strong>{t('pages.doc')}</Typography.Text>
            <NavLink to={RoutesUrls.doc}>
              <LinkPencilIcon />
            </NavLink>
          </div>
          <div className={statusClass(dataFill.doc)}>
            {dataFill.doc ? (
              <>
                <SuccessFillIcon /> {t('fillStatus.succes')}
              </>
            ) : (
              <>
                <ErrorFillIcon /> {t('fillStatus.docError')}
              </>
            )}
          </div>
        </div>
        <div className={cellClass(dataFill.univ)}>
          <div className="flex gap-3 justify-between">
            <Typography.Text strong>{t('pages.university')}</Typography.Text>
            <NavLink to={RoutesUrls.university}>
              <LinkPencilIcon />
            </NavLink>
          </div>
          <div className={statusClass(dataFill.univ)}>
            {dataFill.univ ? (
              <>
                <SuccessFillIcon /> {t('fillStatus.succes')}
              </>
            ) : (
              <>
                <ErrorFillIcon /> {t('fillStatus.vuzError')}
              </>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};
