import { FC, useEffect } from 'react';
import AntDrawer, { DrawerProps } from 'antd/es/drawer';

export const Drawer: FC<DrawerProps> = ({ open, ...props }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return <AntDrawer className="LmsDrawer" placement="bottom" open={open} {...props} />;
};
