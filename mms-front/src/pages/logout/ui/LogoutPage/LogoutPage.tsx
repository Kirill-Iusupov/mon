import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useResetPhoto } from '~entities/photo';
import { useSetUser } from '~entities/user';
// import { useResetUser, useSetUser } from '~entities/user';

import { SignOutView, SignOutViewProps } from '~features/auth/sign-out';
import { RoutesUrls } from '~shared/lib/router';

export interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  const navigate = useNavigate();
  // const resetUser = useResetUser();
  const setUser = useSetUser();

  const resetPhoto = useResetPhoto();

  const handleSignOut: SignOutViewProps['onSignOut'] = useCallback(() => {
    localStorage.removeItem('image');
    // resetUser();
    setUser({ authState: null });

    resetPhoto();

    navigate(RoutesUrls.login, { replace: true });
  }, [navigate, resetPhoto]);

  return <SignOutView onSignOut={handleSignOut} />;
};
