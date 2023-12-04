import { i18n, useTranslation } from '~shared/lib/i18n';
import { Box, Segmented } from '~shared/ui';

import { LocaleCodes } from '../../model';

import styles from './style.module.scss';

export interface SetLocaleSimpleViewProps {}

export const SetLocaleSimpleView: React.FC<SetLocaleSimpleViewProps> = () => {
  const { t } = useTranslation();

  const handleLocaleChange = (payload: string | number) => {
    i18n.changeLanguage(payload as string);
  };

  return (
    <div className={styles.lang}>
      <div
        style={
          i18n.language === LocaleCodes.KYRGYZ
            ? { fontWeight: 'bold', color: 'var(--primary)' }
            : { color: 'var(--gray)' }
        }
        onClick={handleLocaleChange.bind(null, LocaleCodes.KYRGYZ)}
      >
        Кырг
      </div>
      <div
        style={
          i18n.language === LocaleCodes.RUSSIAN
            ? { fontWeight: 'bold', color: 'var(--primary)' }
            : { color: 'var(--gray)' }
        }
        onClick={handleLocaleChange.bind(null, LocaleCodes.RUSSIAN)}
      >
        Рус
      </div>
      <div
        style={
          i18n.language === LocaleCodes.ENGLISH
            ? { fontWeight: 'bold', color: 'var(--primary)' }
            : { color: 'var(--gray)' }
        }
        onClick={handleLocaleChange.bind(null, LocaleCodes.ENGLISH)}
      >
        Eng
      </div>
    </div>
  );

  return (
    <Box title={t('locale.language')}>
      <div className="flex">
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
