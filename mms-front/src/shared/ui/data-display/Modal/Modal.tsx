import { FC, useEffect } from 'react';
import AntModal from 'antd/es/modal';

import { ModalProps } from './type';
import './modal.scss';

const { confirm } = AntModal;

export { confirm as ConfirmModal };

export const Modal: FC<ModalProps> = ({ centered = true, open, ...props }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return <AntModal className="LmsModal" width={860} centered={centered} open={open} {...props} />;
};
