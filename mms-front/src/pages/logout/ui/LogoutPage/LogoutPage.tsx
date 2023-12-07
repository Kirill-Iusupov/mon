import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useResetUser } from '~entities/user';

import { SignOutView, SignOutViewProps } from '~features/auth/sign-out';
import { RoutesUrls } from '~shared/lib/router';

export interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  const navigate = useNavigate();
  const resetUser = useResetUser();

  const handleSignOut: SignOutViewProps['onSignOut'] = useCallback(() => {
    localStorage.removeItem('image');
    resetUser();
    // LocalStorageCache.flush();
    navigate(RoutesUrls.login, { replace: true });
  }, [navigate]);

  return <SignOutView onSignOut={handleSignOut} />;
};
