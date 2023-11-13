import { Table, Typography, useWindowInnerWidth } from '~shared/ui';
import type { TableColumnsType } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';

import { IChallengerList } from '../../model';

import styles from './list.module.scss';
export interface ChallengerListItemViewProps {
  chalList: IChallengerList[] | null;
  goToDetail: (id: number) => void;
}

export const ChallengerListItemView: React.FC<ChallengerListItemViewProps> = ({
  chalList,
  goToDetail,
}) => {
  const { t } = useTranslation();
  const windowWidth = useWindowInnerWidth();

  const columns: TableColumnsType<IChallengerList> = [
    {
      title: '№',
      dataIndex: 'name',
      key: 'name',
      render: (_value, _row, index) => index + 1,
      align: 'center',
      fixed: 'left',
      width: 40,
    },
    {
      title: t('mon.chalList.snp'),
      dataIndex: 'surname',
      key: 'surname',
      render: (_value, row, _index) => (
        <div onClick={() => goToDetail(row.id_challenger)} className={styles.link}>
          {row.surname} {row.name} {row.patronymic}
        </div>
      ),
      fixed: 'left',
    },
    {
      title: t('mon.chalList.status'),
      dataIndex: 'status',
      // key: 'status',
    },
    {
      title: t('mon.chalList.education_level'),
      dataIndex: 'education_level',
      // key: 'education_level',
    },
    {
      title: t('mon.chalList.direction'),
      dataIndex: 'direction',
      // key: 'direction',
    },
    {
      title: t('mon.chalList.info'),
      dataIndex: 'info',
      // key: 'info',
      render: (value, _row, _index) => <input readOnly type="checkbox" checked={value === 1} />,
      align: 'center',
    },
    {
      title: t('mon.chalList.doc'),
      dataIndex: 'doc',
      // key: 'doc',
      render: (value, _row, _index) => <input readOnly type="checkbox" checked={value === 1} />,
      align: 'center',
    },
    {
      title: t('mon.chalList.univ'),
      dataIndex: 'univ',
      // key: 'univ',
      render: (value, row, _index) =>
        value === 1 ? (
          <span>
            {row.university} {row.speciality}
          </span>
        ) : null,
      align: 'center',
    },
  ];

  if (windowWidth > 768) {
    return (
      <Table
        columns={columns}
        size="small"
        dataSource={chalList || []}
        pagination={false}
        scroll={{ x: 500 }}
        // bordered
      />
    );
  }

  return (
    <>
      {chalList?.map((item, index) => {
        return (
          <div key={'challenger' + index} className="grid gap-4 border-t-[1px] pt-4">
            <div className="flex gap-1">
              <Typography.Title level={5} type="secondary">
                {index + 1}.
              </Typography.Title>
              <Typography.Title level={5}>
                <div onClick={() => goToDetail(item.id_challenger)} className={styles.link}>
                  {item.surname} {item.name} {item.patronymic}
                </div>
              </Typography.Title>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">{t('mon.chalList.status')}</Typography.Text>
              <Typography.Text>{item.status}</Typography.Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">
                {t('mon.chalList.education_level')}
              </Typography.Text>
              <Typography.Text>{item.education_level}</Typography.Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">{t('mon.chalList.direction')}</Typography.Text>
              <Typography.Text>{item.direction}</Typography.Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">{t('mon.chalList.info')}</Typography.Text>
              <Typography.Text>
                <input readOnly type="checkbox" checked={item.info === 1} />
              </Typography.Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">{t('mon.chalList.doc')}</Typography.Text>
              <Typography.Text>
                <input readOnly type="checkbox" checked={item.doc === 1} />
              </Typography.Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Typography.Text type="secondary">{t('mon.chalList.univ')}</Typography.Text>
              <Typography.Text>
                <input readOnly type="checkbox" checked={item.univ === 1} />
              </Typography.Text>
            </div>
          </div>
        );
      })}
    </>
  );
};
