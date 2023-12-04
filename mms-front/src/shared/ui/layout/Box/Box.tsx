// import { FC, forwardRef } from 'react';
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { ArrowDown, ArrowUp } from '~shared/ui/Icons';

import styles from './box.module.scss';

export interface BoxProps {
  children?: React.ReactNode;
  background?: string;
  title?: string | any;
  padding?: number | string;
  component?: React.ElementType;
  hoverable?: boolean;
  ref?: any;
  collapsable?: boolean;
  defaultOpen?: boolean;
  width?: number | string;
  height?: number | string;
}

export const Box: FC<BoxProps> = ({
  title,
  children,
  padding,
  background,
  hoverable,
  ref,
  collapsable,
  defaultOpen = false,
  width,
  height,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const boxClass = classNames(styles.box, hoverable ? styles.hovered : '');

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const onCollapse = () => {
    setOpen(!open);
  };

  return (
    <div
      className={boxClass}
      style={{ background: background, width: width, height: height }}
      ref={ref}
    >
      {title ? (
        <div className={styles.title}>
          {title}{' '}
          {collapsable ? (
            <div className={styles.arrow} onClick={onCollapse}>
              {open ? <ArrowUp /> : <ArrowDown />}
            </div>
          ) : null}
        </div>
      ) : null}
      {collapsable && !open ? null : (
        <div className={styles.content} style={{ padding: padding }}>
          {children}
        </div>
      )}
    </div>
  );
};

Box.displayName = 'Box';
