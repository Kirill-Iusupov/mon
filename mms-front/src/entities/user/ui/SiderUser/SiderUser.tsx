import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { Avatar, useWindowInnerWidth } from '~shared/ui';

import styles from './siderUser.module.scss';

export interface SiderUserProps {
  photo?: string | null;
  fio?: string;
  role?: string | null;
  collapsed?: boolean;
  onError?: ReactNode;
}

export const SiderUser: FC<SiderUserProps> = ({ photo, fio, role, collapsed, onError }) => {
  const windowWidth = useWindowInnerWidth();
  const wrapperClass = classNames(styles.wrapper, collapsed ? styles.collapsed : '');

  return (
    <div className={wrapperClass}>
      <Avatar src={photo} size={collapsed && windowWidth > 768 ? 30 : 60}>
        {onError}
      </Avatar>
      <div className={styles.fioRole}>
        <h2 className={styles.fio}>{fio}</h2>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
};
