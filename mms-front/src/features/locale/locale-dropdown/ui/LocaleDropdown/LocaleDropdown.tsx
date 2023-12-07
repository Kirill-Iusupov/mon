import { Button, Dropdown, Space } from 'antd';

import { i18n, useTranslation } from '~shared/lib/i18n';

import { CaretDownOutlined } from '~shared/ui';

import { LocaleCodes } from '../../model';

export interface SetLocaleViewProps {}

export const LocaleDropdown: React.FC<SetLocaleViewProps> = () => {
  const { t } = useTranslation();

  const handleLocaleChange = (payload: string | number) => {
    i18n.changeLanguage(payload as string);
  };

  const items: any[] = [
    {
      label: <div className="px-3">{t('locale.russian')}</div>,
      value: LocaleCodes.RUSSIAN,
    },
    {
      label: <div className="px-3">{t('locale.kyrgyz')}</div>,
      value: LocaleCodes.KYRGYZ,
    },
    {
      label: <div className="px-3">{t('locale.english')}</div>,
      value: LocaleCodes.ENGLISH,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }}>
        <Button onClick={() => handleLocaleChange}>
          <Space>
            Button
            <CaretDownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};
