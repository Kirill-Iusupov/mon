import { FC } from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

import { CaretDownOutlined } from '~shared/ui/Icons/icons';

import './select.scss';
import { useTranslation } from '~shared/lib/i18n';

// export const Select: FC<SelectProps> = ({ children, ...props }) => {
//   return <select {...props}>{children}</select>;
export type SelectProps = AntSelectProps;

export const Select: FC<SelectProps> = ({
  size = 'large',
  suffixIcon = <CaretDownOutlined />,
  placeholder,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <AntSelect
      size={size}
      suffixIcon={suffixIcon}
      {...props}
      placeholder={placeholder || t('actions.select')}
    />
  );
};
