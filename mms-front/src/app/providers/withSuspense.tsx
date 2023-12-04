import { Suspense } from 'react';

import { Spinner } from '~shared/ui';

import { AppProps } from '../types';

export const withSuspense = (component: Component) => (props: AppProps) => {
  return <Suspense fallback={<Spinner />}>{component(props)}</Suspense>;
};
