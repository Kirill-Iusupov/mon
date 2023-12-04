import { FC, useEffect, useState } from 'react';

import { debounce } from '~shared/lib/utils';

import styles from './style.module.scss';

export interface LoginLayoutProps extends ComponentWithChildren {
  picture?: string;
}

export const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  const [innerHigth, setInnerHigth] = useState<string | number>('100%');

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      if (window.innerWidth <= 768) {
        setInnerHigth(window.innerHeight);
      }
    }, 0);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <div
      className={styles.LoginLayout}
      style={{
        maxHeight: innerHigth,
      }}
    >
      {children}
    </div>
  );
};
