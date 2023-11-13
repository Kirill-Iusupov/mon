import { lazy, useEffect, useRef } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';
import { RequireAuth } from '~shared/lib/auth';
// import { useSignCheck } from '~/shared/lib/auth/hooks/useSignCheck';
// import { signCheck as checkApi } from '~/features/auth/sign-check';

import { BaseLayout } from '~pages/layouts';
import { LoginPage } from '~pages/login';
import { NotFoundPage } from '~pages/not-found';
import { LogoutPage } from '~pages/logout';
import { HomePage } from '~pages/home';
// import { PlanPage } from '~pages/plan';
import { PersonalPage } from '~pages/personal';
import { InfoPage } from '~pages/info';
import { DocPage } from '~pages/doc';
import { UniversityPage } from '~pages/university';
import { RegulationsPage } from '~pages/regulations';
import { ManualPage } from '~pages/manual';
import { ChallengerDetailPage } from '~pages/monDetail';

const SettingsPage = lazy(() =>
  import('../settings').then((module) => ({ default: module.SettingsPage }))
);

// const NewsPage = lazy(() => import('../news').then((module) => ({ default: module.NewsPage })));

export const redirectUrl = RoutesUrls.login;

// const EmptyPage: React.FC<ComponentWithChild> = ({ children }) => <p>{children}</p>;

const createProtectedElement = (component: JSX.Element) => (
  <RequireAuth loginPath={RoutesUrls.login}>{component}</RequireAuth>
);

export const Router = () => {
  const location = useLocation();
  const effectCalled = useRef(false);
  const navigate = useNavigate();
  // const signCheck = useSignCheck();

  // console.errors({ location });

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      // checkSuccessHandler();
      navigate(RoutesUrls.home);
      effectCalled.current = true;
    }
  }, [navigate]);
  // const checkSuccessHandler = () => {
  //   signCheck({ checkApi }).then((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       navigate(RoutesUrls.root);
  //     } else {
  //       navigate(redirectUrl);
  //     }
  //   });
  // };

  return (
    <Routes location={location} key={RoutesUrls.login}>
      <Route path={RoutesUrls.login} element={<LoginPage />} />
      {/* <Route path={RoutesUrls.root}> */}
      <Route path={RoutesUrls.root} element={createProtectedElement(<BaseLayout />)}>
        {/* <Route index element={<EmptyPage>Index page</EmptyPage>} /> */}
        {/* <Route index path={RoutesUrls.home} element={<HomePage />} /> */}
        <Route path={RoutesUrls.home} element={<HomePage />} />
        <Route path={RoutesUrls.settings} element={<SettingsPage />} />
        {/* <Route path={RoutesUrls.news} element={<NewsPage />} /> */}
        {/* <Route path={RoutesUrls.plan} element={<PlanPage />} /> */}

        <Route path={RoutesUrls.personal} element={<PersonalPage />} />
        <Route path={RoutesUrls.info} element={<InfoPage />} />
        <Route path={RoutesUrls.doc} element={<DocPage />} />
        <Route path={RoutesUrls.university} element={<UniversityPage />} />
        <Route path={RoutesUrls.challengerDetail + '/:id'} element={<ChallengerDetailPage />} />
        <Route path={RoutesUrls.regulations} element={<RegulationsPage />} />
        <Route path={RoutesUrls.manual} element={<ManualPage />} />
        <Route path={RoutesUrls.logout} element={<LogoutPage />} />
        <Route path={RoutesUrls.notFound} element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
