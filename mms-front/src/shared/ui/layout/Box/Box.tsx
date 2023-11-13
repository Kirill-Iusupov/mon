// import { FC, forwardRef } from 'react';
import { FC, ReactNode } from 'react';

import styles from './box.module.scss';

export interface BoxProps {
  children?: React.ReactNode;
  styles?: any;
  title?: string | ReactNode;
  padding?: number | string;
  component?: React.ElementType;
}

export const Box: FC<BoxProps> = ({ title, children, padding }) => {
  return (
    <div className={styles.box} style={{ padding: padding }}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

Box.displayName = 'Box';
