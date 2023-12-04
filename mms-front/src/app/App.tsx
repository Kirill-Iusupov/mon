import { useEffect, useState } from 'react';

import { Router } from '~pages';

import { AuthProvider } from '~shared/lib/auth';

import { useWindowInnerWidth } from '~shared/ui';

import { AuthProviderExporter, withProviders } from './providers';
import { AppProps } from './types';

import './styles/tailwind.css';
import './styles/index.scss';

const App: React.FC<AppProps> = () => {
  const { AuthProviderFront } = AuthProviderExporter;
  const [innerHigth, setInnerHigth] = useState<number | string>('100%');
  const windowWidth = useWindowInnerWidth();

  useEffect(() => {
    if (windowWidth <= 768) {
      setInnerHigth(window.innerHeight);
    }
  }, [windowWidth]);

  return (
    <div style={{ maxHeight: innerHigth }}>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === 'https:'}
      >
        <AuthProviderFront>
          <Router />
        </AuthProviderFront>
      </AuthProvider>
    </div>
  );
};

const ProvidedApp: React.FC<AppProps> = withProviders(App);

export { ProvidedApp as App };
