import { FC } from 'react';

// import Spin from 'antd/es/spin';

import styles from './style.module.scss';

interface SpinnerProps {
  spinning?: boolean;
}

export const Spinner: FC<SpinnerProps> = ({ spinning = true }) => {
  if (spinning) {
    return (
      <div>
        {/* <Spin spinning={spinning} size="large" /> */}
        <div className={styles.preloader}>
          <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className={styles.big_circle}
              d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51"
              stroke="#252525"
              strokeWidth="2"
            />
            <path
              className={styles.small_circle}
              d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51"
              stroke="#252525"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};
