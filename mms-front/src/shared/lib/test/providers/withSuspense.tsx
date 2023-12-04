import { Suspense } from 'react';

import { Spinner } from '~shared/ui';

import { TestRootProvidersProps } from './types';

export const withSuspense = (component: Component) => (props: TestRootProvidersProps) => {
  return <Suspense fallback={<Spinner />}>{component(props)}</Suspense>;
};
