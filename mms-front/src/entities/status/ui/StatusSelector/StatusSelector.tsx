import { FC } from 'react';

import { Labeled, Select, SelectProps } from '~shared/ui';

import { IStatusItem } from '../../model';

export interface StatusSelectorProps extends SelectProps {
  onStatusSelect: ((value: any) => void) | undefined;
  value: any;
  label: string;
  required?: boolean;
  statusList: IStatusItem[];
}

export const StatusSelector: FC<StatusSelectorProps> = ({
  onStatusSelect,
  value,
  statusList,
  label,
  required,
  ...props
}) => {
  return (
    <Labeled label={label} required={required}>
      <Select
        value={value}
        onChange={onStatusSelect}
        options={statusList.map((item) => {
          return {
            value: item.id_status,
            label: item.status,
          };
        })}
        {...props}
      />
    </Labeled>
  );
};
