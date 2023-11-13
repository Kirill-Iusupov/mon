import { FC } from 'react';

import { Labeled, Select, SelectProps } from '~shared/ui';

import { DistrictItem } from '../../model';

export interface DistrictSelectorProps extends SelectProps {
  onDistrictSelect: ((value: any) => void) | undefined;
  value: any;
  label: string;
  districtList: DistrictItem[];
  required?: boolean;
}

export const DistrictSelector: FC<DistrictSelectorProps> = ({
  onDistrictSelect,
  value,
  districtList,
  label,
  ...props
}) => {
  return (
    <Labeled label={label} required>
      <Select
        value={value}
        onChange={onDistrictSelect}
        options={districtList.map((item) => {
          return {
            value: item.id_district_city,
            label: item.district_city,
          };
        })}
        {...props}
      />
    </Labeled>
  );
};
