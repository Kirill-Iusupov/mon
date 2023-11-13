import { useEffect, useMemo } from 'react';

import { useSetProfile } from '~entities/profile';

// import { useResetUser, useSetUser, useUser } from '~entities/user';
import { useSetUser, useUser } from '~entities/user';
import { useAuthHeader, useIsAuthenticated } from '~shared/lib/auth';

export interface AuthProviderFrontProps extends ComponentWithChildren {}

export const AuthProviderFront: React.FC<AuthProviderFrontProps> = ({ children }) => {
  // const resetUser = useResetUser();
  const user = useUser();
  const isAuth = useIsAuthenticated();
  const getToken = useAuthHeader();
  const setProfile = useSetProfile();

  const setUser = useSetUser();

  const token = useMemo(() => getToken(), [getToken]);

  useEffect(() => {
    if (!user && isAuth() && token) {
      // resetUser();
      setUser({ authState: null });
    } else {
      if (!user) {
        return;
      }

      if (user.type === 1) {
        // applicant
        setProfile({ role: user.type, id: 0 });
      }

      if (user.type === 2) {
        // mon
      }

      if (user.type === 3) {
        // aparat
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuth]);

  return children;
};
