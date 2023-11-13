import { FC } from 'react';

import { Labeled, Select, SelectProps } from '~shared/ui';

import { EducationItem } from '../../model';

export interface EducationSelectorProps extends SelectProps {
  onEducationSelect: ((value: any) => void) | undefined;
  value: any;
  label: string;
  required?: boolean;
  educationList: EducationItem[];
}

export const EducationSelector: FC<EducationSelectorProps> = ({
  onEducationSelect,
  value,
  educationList,
  label,
  required,
  ...props
}) => {
  return (
    <Labeled label={label} required={required}>
      <Select
        value={value}
        onChange={onEducationSelect}
        options={educationList.map((item) => {
          return {
            value: item.id_education_level,
            label: item.education_level,
          };
        })}
        {...props}
      />
    </Labeled>
  );
};
