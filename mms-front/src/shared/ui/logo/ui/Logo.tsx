import { useTranslation } from '~shared/lib/i18n';

import styles from './Logo.module.scss';

import Logotype from './Logo.png';

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logotype} alt="logo" />
      <h2 className={styles.title}>
        {t('auth:logoText1')} <br /> {t('auth:logoText2')}
      </h2>
    </div>
  );
};
