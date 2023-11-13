import { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Avatar } from '~shared/ui';

import styles from './siderUser.module.scss';

export interface SiderUserProps {
  photo?: string | null;
  fio?: string;
  role?: string | null;
  collapsed?: boolean | undefined;
  onError?: ReactNode;
}

export const SiderUser: FC<SiderUserProps> = ({ photo, fio, role, collapsed, onError }) => {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const wrapperClass = classNames(styles.wrapper, open ? styles.collapsed : '');

  useEffect(() => {
    if (!collapsed) {
      setTimeout(() => {
        setOpen(false);
      }, 300);
    } else {
      setOpen(collapsed);
    }
  }, [collapsed]);

  return (
    <div className={wrapperClass}>
      <Avatar src={photo ? photo : null} size={56}>
        {onError}
      </Avatar>
      <div className={styles.fioRole}>
        <h2 className={styles.fio}>{fio}</h2>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
};
