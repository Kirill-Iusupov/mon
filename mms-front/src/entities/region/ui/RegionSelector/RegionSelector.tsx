import { FC } from 'react';

import { Labeled, Select, SelectProps } from '~shared/ui';

import { RegionItem } from '../../model';

export interface RegionSelectorProps extends SelectProps {
  onRegionSelect: ((value: any) => void) | undefined;
  value?: any | string;
  label: string;
  required?: boolean;
  regionList: RegionItem[];
}

export const RegionSelector: FC<RegionSelectorProps> = ({
  onRegionSelect,
  value,
  regionList,
  label,
  required,
  ...props
}) => {
  return (
    <Labeled label={label} required={required}>
      <Select
        value={value}
        onChange={onRegionSelect}
        options={regionList.map((item) => {
          return {
            value: item.id_region,
            label: item.region,
          };
        })}
        {...props}
      />
    </Labeled>
  );
};
