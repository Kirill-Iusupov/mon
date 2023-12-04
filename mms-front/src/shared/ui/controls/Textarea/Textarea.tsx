import React from 'react';
import Input from 'antd/es/input';

import './textarea.scss';

import { TextAreaProps } from './index';

const { TextArea } = Input;

export const Textarea: React.FC<TextAreaProps> = ({ className = 'LmsTextarea', ...props }) => {
  return <TextArea className={className} {...props} />;
};
