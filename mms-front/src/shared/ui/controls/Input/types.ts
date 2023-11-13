import { InputRef } from 'antd';
import { Ref } from 'react';

export interface InputLabelProps {
  children?: React.ReactNode;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  ref?: Ref<InputRef> | undefined; //React.MutableRefObject<HTMLInputElement | undefined>;
  maxLength?: number;
  showCount?:
    | boolean
    | {
        formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode;
      };
  status?: 'error' | 'warning' | '';
  styles?: any;
  prefix?: React.ReactNode;
  size?: 'large' | 'middle' | 'small';
  suffix?: React.ReactNode;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
  label?: string;
}
