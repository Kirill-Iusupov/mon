import { useEffect, useState } from 'react';

import { Router } from '~pages';

import { AuthProvider } from '~shared/lib/auth';

// import { CssBaseline } from '~shared/ui';
import { useWindowInnerWidth } from '~shared/ui';

import { AuthProviderExporter, withProviders } from './providers';
import { AppProps } from './types';

// import { PageContextBuiltIn } from 'vite-plugin-ssr';
// import { HelmetProvider } from 'react-helmet-async';

// import { PageContext, PageContextProvider } from '~shared/model';

// import { clientProvider } from '../lib/emotion';

import './styles/tailwind.css';
import './styles/index.scss';
import './styles/fontFamily.scss';

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
