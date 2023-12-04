import { useEffect, useMemo } from 'react';

import { LocalStorageCache } from '~shared/lib/cache';

// import { useResetUser, useSetUser, useUser } from '~entities/user';
import { User, useSetUser, useUser } from '~entities/user';
import { useAuthHeader, useIsAuthenticated } from '~shared/lib/auth';
import { useTranslation } from '~shared/lib/i18n';

export interface AuthProviderFrontProps extends ComponentWithChildren {}

export const AuthProviderFront: React.FC<AuthProviderFrontProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const user = useUser();
  const isAuth = useIsAuthenticated();
  const getToken = useAuthHeader();
  const setUser = useSetUser();

  const token = useMemo(() => getToken(), [getToken]);

  useEffect(() => {
    LocalStorageCache.flushExpired();

    if (!user && isAuth() && token) {
      // resetUser();
      setUser({ authState: null });
    } else {
      if (!user) {
        return;
      }

      if (user.type === 1) {
        console.log('admin');
      }

      if (user.type === 2) {
        console.log('user');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuth]);

  return children;
};
