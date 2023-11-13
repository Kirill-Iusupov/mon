import React from 'react';
import { FC, ReactEventHandler } from 'react';
import { Button as AntButton } from 'antd';

import './button.scss';

export interface ButtonProps {
  children?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactNode;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round';
  size?: 'middle';
  target?: string;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  onClick?: ReactEventHandler;
  color?: 'inherit';

  prefixCls?: string;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  shape = 'default',
  prefixCls = 'lmsButton',
  ...props
}) => {
  return (
    <AntButton prefixCls={prefixCls} shape={shape} {...props}>
      {children}
    </AntButton>
  );
};
