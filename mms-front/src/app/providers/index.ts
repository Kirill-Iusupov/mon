import compose from 'compose-function';

import { withLocalization } from './withLocalization';
import { withAtomState } from './withAtomState';
import { withHelmet } from './withHelmet';
import { withSuspense } from './withSuspense';
import { withRouter } from './withRouter';
// import { withNotification } from './withNotification';

export const withProviders = compose<any>(
  withLocalization,
  // withNotification,
  withAtomState,
  withHelmet,
  withRouter,
  withSuspense
);
