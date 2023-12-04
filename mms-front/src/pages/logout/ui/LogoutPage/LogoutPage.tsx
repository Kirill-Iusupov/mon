import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSetUser } from '~entities/user';
// import { useResetUser, useSetUser } from '~entities/user';

import { SignOutView, SignOutViewProps } from '~features/auth/sign-out';
import { LocalStorageCache } from '~shared/lib/cache';
import { RoutesUrls } from '~shared/lib/router';

export interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  const navigate = useNavigate();
  // const resetUser = useResetUser();
  const setUser = useSetUser();

  const handleSignOut: SignOutViewProps['onSignOut'] = useCallback(() => {
    localStorage.removeItem('image');
    // resetUser();
    setUser({ authState: null });
    LocalStorageCache.flush();
    navigate(RoutesUrls.login, { replace: true });
  }, [navigate, setUser]);

  return <SignOutView onSignOut={handleSignOut} />;
};
