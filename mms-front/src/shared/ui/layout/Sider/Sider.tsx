import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useWindowInnerWidth } from '~shared/ui/utils';

import styles from './sider.module.scss';

import { SiderProps } from './type';

export const Sider: React.FC<SiderProps> = ({ routes, settings, collapsed }) => {
  const [innerHigth, setInnerHigth] = useState<number>(664);
  const windowWidth = useWindowInnerWidth();

  const siderClass = classNames(styles.SiderWrapper, collapsed ? styles.collapsed : '');

  useEffect(() => {
    if (windowWidth <= 768) {
      setInnerHigth(window.innerHeight);
    }
  }, [windowWidth]);

  return (
    <div
      className={siderClass}
      style={{ maxHeight: windowWidth <= 768 ? innerHigth - 64 : 'unset' }}
    >
      <div className={styles.line} />
      <div className={styles.routes}>{routes}</div>
      <div className={styles.line} />
      <div className={styles.settings_logout}>{settings}</div>
    </div>
  );
};
