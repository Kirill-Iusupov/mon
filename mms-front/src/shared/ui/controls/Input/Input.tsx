import React from 'react';
import AntInput, { InputProps } from 'antd/es/input';

import { PassInVisibleIcon, PassVisibleIcon } from '~shared/ui/Icons/icons';

import './Input.scss';

export const Input: React.FC<InputProps> = ({
  children,
  className = 'lmsInput',
  type,
  size = 'large',
  ...props
}) => {
  switch (type) {
    case 'password':
      return (
        <AntInput.Password
          className={className}
          type={type}
          size={size}
          {...props}
          iconRender={(visible) => (visible ? PassVisibleIcon() : PassInVisibleIcon())}
        />
      );
    default:
      return (
        <AntInput className={className} type={type} size={size} {...props}>
          {children}
        </AntInput>
      );
  }
};
