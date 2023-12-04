import { FC, ReactEventHandler, ReactNode } from 'react';

import { Tooltip, Typography, useWindowInnerWidth } from '~shared/ui';

import { useIcon } from './useIcon';
import styles from './fileButton.module.scss';
import { useColor } from './useColor';

interface FileButtonProps {
  title?: string;
  href?: string;
  target?: string;
  rel?: string;
  key?: string;
  icon?: ReactNode;
  collapsed?: boolean;
  onClick?: ReactEventHandler;
}

export const FileButton: FC<FileButtonProps> = ({
  title = 'file',
  href,
  target = '_blank',
  rel = 'noreferrer',
  key,
  onClick,
}) => {
  return (
    <Tooltip title={title} color={useColor(title)} key={key}>
      <a href={href} onClick={onClick} target={target} rel={rel} className={styles.wrapper}>
        <div className={styles.title}>
          {useIcon(title)}
          <Typography.Text
            ellipsis
            style={{ width: useWindowInnerWidth() <= 410 ? 150 : '', color: useColor(title) }}
          >
            {title}
          </Typography.Text>
        </div>
        <div className={styles.bg} style={{ background: useColor(title) }} />
      </a>
    </Tooltip>
  );
};
