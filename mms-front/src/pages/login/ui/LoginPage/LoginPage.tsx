import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { i18n } from '~shared/lib/i18n';
import { Navigate, RoutesUrls, useNavigate } from '~shared/lib/router';
import { useIsAuthenticated } from '~shared/lib/auth';
import { SignInForm, SignInFormProps } from '~features/auth';

import { useSetUser } from '~entities/user';

import { LoginLayout } from '../../../layouts';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const setUser = useSetUser();
  const { t } = i18n;

  const handleSignIn: SignInFormProps['onSignIn'] = useCallback(
    ({ authState }) => {
      setUser({ authState }).then(() => {
        navigate(RoutesUrls.home, { replace: true });
      });
    },
    [navigate, setUser]
  );

  if (isAuth()) {
    return <Navigate to={RoutesUrls.home} replace />;
  }

  return (
    <LoginLayout>
      <Helmet>
        <title>{t('cm:pages.login')}</title>
      </Helmet>
      <SignInForm onSignIn={handleSignIn} />
    </LoginLayout>
  );
};
