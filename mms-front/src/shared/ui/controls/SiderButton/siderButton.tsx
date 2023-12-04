import classNames from 'classnames';
import { FC, ReactEventHandler, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { Tooltip } from '~shared/ui';

import styles from './siderButton.module.scss';

interface SiderButtonProps {
  title?: string;
  path?: string;
  icon?: ReactNode;
  collapsed?: boolean;
  onClick?: ReactEventHandler;
}

export const SiderButton: FC<SiderButtonProps> = ({
  title,
  path = '/',
  icon,
  collapsed = true,
  onClick,
}) => {
  const btnClass = (isActive: boolean) => {
    return classNames(
      styles.wrapper,
      collapsed ? styles.iconly : styles.titlely,
      isActive ? styles.active : ''
    );
  };

  return (
    <Tooltip title={collapsed && title} placement="right">
      <NavLink className={({ isActive }) => btnClass(isActive)} to={path} onClick={onClick}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </NavLink>
    </Tooltip>
  );
};
