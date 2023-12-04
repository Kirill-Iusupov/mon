import React from 'react';

import { Input } from '../Input';

import { LabeledFieldProps } from './types';

export const LabeledField: React.FC<LabeledFieldProps> = ({ children, label, required }) => {
  return (
    <div>
      {label && <Input required={required}>{label}</Input>}
      {children}
    </div>
  );
};
