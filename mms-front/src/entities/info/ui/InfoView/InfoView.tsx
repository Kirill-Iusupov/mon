import { FC } from 'react';

import { Line, Typography } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { LangList } from '~entities/lang';

import { IInfo } from '../../model';
export interface InfoViewProps {
  info: IInfo | null;
  langList: LangList;
}

export const InfoView: FC<InfoViewProps> = ({ info, langList }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-[18px]">{t('allInfo:address')}</h3>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:gap-4">
        <div>
          <Typography.Text type="secondary">{t('allInfo:region')}</Typography.Text>
          <Typography.Title level={5}>{info?.region}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:district')}</Typography.Text>
          <Typography.Title level={5}>{info?.district_city}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:address')}</Typography.Text>
          <Typography.Title level={5}>{info?.address}</Typography.Title>
        </div>
      </div>
      <Line />

      <h3 className="text-[18px]">{t('allInfo:learn')}</h3>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:gap-4">
        <div>
          <Typography.Text type="secondary">{t('allInfo:education')}</Typography.Text>
          <Typography.Title level={5}>{info?.education_level}</Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:direction')}</Typography.Text>
          <Typography.Title level={5}>{info?.lan_direction}</Typography.Title>
        </div>

        <div>
          <Typography.Text type="secondary">{t('allInfo:kg')}</Typography.Text>
          <Typography.Title level={5}>
            {info?.kyrgyz
              ? t(`${langList.find((l) => l.value === parseInt(info.kyrgyz))?.label}`)
              : ''}
          </Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:ru')}</Typography.Text>
          <Typography.Title level={5}>
            {info?.russian
              ? t(`${langList.find((l) => l.value === parseInt(info.russian))?.label}`)
              : ''}
          </Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:en')}</Typography.Text>
          <Typography.Title level={5}>
            {info?.english
              ? t(`${langList.find((l) => l.value === parseInt(info.english))?.label}`)
              : ''}
          </Typography.Title>
        </div>
        <div>
          <Typography.Text type="secondary">{t('allInfo:other')}</Typography.Text>
          <Typography.Title level={5}>
            {info?.other
              ? t(`${langList.find((l) => l.value === parseInt(info.other))?.label}`)
              : ''}
          </Typography.Title>
        </div>
      </div>
    </>
  );
};
