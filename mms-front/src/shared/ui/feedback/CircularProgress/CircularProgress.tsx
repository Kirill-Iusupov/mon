import { FC } from 'react';

import { Spin } from 'antd';

export const CircularProgress: FC = () => {
  return (
    <Spin tip="Loading" size="small">
      <div className="content" />
    </Spin>
  );
};
