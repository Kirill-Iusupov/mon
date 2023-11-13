import React from 'react';
import { Input as AntInput } from 'antd';

import { PassInVisibleIcon, PassVisibleIcon } from '~shared/ui/Icons/icons';

import './Input.scss';
import { InputLabelProps } from './types';

export const Input: React.FC<InputLabelProps> = ({
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
