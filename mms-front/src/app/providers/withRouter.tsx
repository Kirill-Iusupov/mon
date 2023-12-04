import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Spinner } from '~shared/ui';
// import Loader from "~/shared/ui"

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {/* <Suspense fallback={<Loader size="lg" />}> */}
        {component()}
      </Suspense>
    </BrowserRouter>
  );
