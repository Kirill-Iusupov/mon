import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useCollapsed, useSetCollapsed } from '~entities/burger';
import { useWindowInnerWidth } from '~shared/ui/utils';

import styles from './sider.module.scss';

import { SiderProps } from './type';

export const Sider: React.FC<SiderProps> = ({ user, routes, links, settings, collapsed }) => {
  const state = useCollapsed();
  const windowWidth = useWindowInnerWidth();
  const [innerHigth, setInnerHigth] = useState<number>(664);

  useEffect(() => {
    if (windowWidth <= 768) {
      setInnerHigth(window.innerHeight);
    }
  }, [windowWidth]);

  const setCollapsed = useSetCollapsed();

  const bgClass = classNames(styles.bg, collapsed ? styles.collapsedBg : '');
  const siderClass = classNames(styles.SiderWrapper, collapsed ? styles.collapsed : '');

  const handleCollapse = () => {
    if (windowWidth <= 768) {
      setCollapsed(!state);
    }
  };

  return (
    <div className={bgClass} onClick={handleCollapse}>
      <div
        className={siderClass}
        style={{ maxHeight: windowWidth <= 768 ? innerHigth - 64 : 'unset' }}
      >
        <div>
          <div className={styles.user}>{user}</div>
          <div className={styles.routes}>{routes}</div>
        </div>
        {links ? (
          <>
            <div className={styles.line} />
            <div className={styles.links}>{links}</div>
          </>
        ) : null}
        <div className={styles.settings_logout}>{settings}</div>
      </div>
    </div>
  );
};
