import { FC } from 'react';
import AntSelect, { SelectProps as AntSelectProps } from 'antd/es/select';

import { CaretDownOutlined } from '~shared/ui/Icons/icons';

import './select.scss';

// export const Select: FC<SelectProps> = ({ children, ...props }) => {
//   return <select {...props}>{children}</select>;
export type SelectProps = AntSelectProps;

export const Select: FC<SelectProps> = ({
  size = 'large',
  suffixIcon = <CaretDownOutlined />,
  ...props
}) => {
  return <AntSelect className="LmsSelect" size={size} suffixIcon={suffixIcon} {...props} />;
};
