import { FC } from 'react';

import { Labeled, Select, SelectProps } from '~shared/ui';

import { DirectionItem } from '../../model';

export interface DirectionSelectorProps extends SelectProps {
  onDirectionSelect: ((value: any) => void) | undefined;
  value: any;
  label: string;
  required?: boolean;
  directionList: DirectionItem[];
}

export const DirectionSelector: FC<DirectionSelectorProps> = ({
  onDirectionSelect,
  value,
  directionList,
  label,
  required,
  ...props
}) => {
  return (
    <Labeled label={label} required={required}>
      <Select
        value={value}
        onChange={onDirectionSelect}
        options={directionList.map((direction) => {
          return {
            value: direction.id_direction,
            label: `${direction.direction} - ${direction.quota}`,
          };
        })}
        {...props}
      />
    </Labeled>
  );
};
