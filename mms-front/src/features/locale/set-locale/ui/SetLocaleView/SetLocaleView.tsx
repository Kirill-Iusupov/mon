import { i18n, useTranslation } from '~shared/lib/i18n';
import { Box, Segmented } from '~shared/ui';

import { LocaleCodes } from '../../model';

export interface SetLocaleViewProps {}

export const SetLocaleView: React.FC<SetLocaleViewProps> = () => {
  const { t } = useTranslation();

  const handleLocaleChange = (payload: string | number) => {
    i18n.changeLanguage(payload as string);
  };

  return (
    <Box title={t('locale.language')}>
      <div className="flex col">
        <Segmented
          onChange={handleLocaleChange}
          size="large"
          defaultValue={i18n.language}
          options={[
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
          ]}
        />
      </div>
    </Box>
  );
};
