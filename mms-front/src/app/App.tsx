import { useEffect, useState } from 'react';

import { Router } from '~pages';

import { useWindowInnerWidth } from '~shared/ui';

import { withProviders } from './providers';
import { AppProps } from './types';

import './styles/tailwind.css';
import './styles/index.scss';

const App: React.FC<AppProps> = () => {
  const [innerHigth, setInnerHigth] = useState<number | string>('100%');
  const windowWidth = useWindowInnerWidth();

  useEffect(() => {
    if (windowWidth <= 768) {
      setInnerHigth(window.innerHeight);
    }
  }, [windowWidth]);

  return (
    <div style={{ maxHeight: innerHigth }}>
      <Router />
    </div>
  );
};

const ProvidedApp: React.FC<AppProps> = withProviders(App);

export { ProvidedApp as App };
