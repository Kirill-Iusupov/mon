import React from 'react';
import { FC, ReactEventHandler } from 'react';
import AntButton from 'antd/es/button';

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
  size?: 'middle' | 'small' | 'large';
  target?: string;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  onClick?: ReactEventHandler;
  color?: 'inherit';

  prefixCls?: string;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  shape = 'round',
  prefixCls = 'lmsButton',
  ...props
}) => {
  return (
    <AntButton prefixCls={prefixCls} shape={shape} {...props}>
      {children}
    </AntButton>
  );
};
