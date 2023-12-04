import notification from 'antd/es/notification';
import type { NotificationPlacement } from 'antd/es/notification/interface';

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    message: string = '',
    description: string = '',
    placement: NotificationPlacement = 'top'
  ) => {
    api.open({
      message,
      description,
      className: 'custom-class',
      placement,
    });
  };

  const closeNotification = () => api.destroy();

  return { openNotification, closeNotification, contextHolder };
};
