import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Loader from "~/shared/ui"

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<p>Loading ...</p>}>
        {/* <Suspense fallback={<Loader size="lg" />}> */}
        {component()}
      </Suspense>
    </BrowserRouter>
  );
