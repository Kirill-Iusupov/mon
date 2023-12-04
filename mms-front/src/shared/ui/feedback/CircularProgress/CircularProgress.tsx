import { FC } from 'react';

import Spin from 'antd/es/spin';

export const CircularProgress: FC = () => {
  return (
    <Spin tip="Loading" size="small">
      <div className="content" />
    </Spin>
  );
};
