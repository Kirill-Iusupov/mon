import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Navigate, RoutesUrls } from '~shared/lib/router';

import { BaseLayout } from '~pages/layouts';
import { LoginPage } from '~pages/login';
import { NotFoundPage } from '~pages/not-found';
import { LogoutPage } from '~pages/logout';
import { SettingsPage } from '~pages/settings';
import { TablePage } from '~pages/businessTrips';
import { SchedulePage } from '~pages/schedule';
import { EmployersPage } from '~pages/employers';
import { StructurePage } from '~pages/structure';
import { ReportsPage } from '~pages/reports';
import { useSetUser, useUser } from '~entities/user';

interface RequireAuthProps {
  children: JSX.Element;
  loginPath: string;
}

const RequireAuth: React.FunctionComponent<RequireAuthProps> = ({ children, loginPath }) => {
  const user = useUser();

  const isAuth = () => {
    if (user) {
      return true;
    }

    return false;
  };

  const location = useLocation();

  if (!isAuth()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
};

const createProtectedElement = (component: JSX.Element) => (
  <RequireAuth loginPath={RoutesUrls.login}>{component}</RequireAuth>
);

export const Router = () => {
  const location = useLocation();
  const user = useUser();
  const setUser = useSetUser();

  useEffect(() => {
    if (!user) {
      setUser({ authState: null });
    }
  }, []);

  return (
    <Routes location={location} key={RoutesUrls.login}>
      <Route path={RoutesUrls.login} element={<LoginPage />} />

      <Route path={RoutesUrls.root} element={createProtectedElement(<BaseLayout />)}>
        <Route path={RoutesUrls.settings} element={<SettingsPage />} />
        <Route path={RoutesUrls.reports} element={<ReportsPage />} />
        <Route path={RoutesUrls.structure} element={<StructurePage />} />
        <Route path={RoutesUrls.schedule} element={<SchedulePage />} />
        <Route path={RoutesUrls.logout} element={<LogoutPage />} />
        <Route path={RoutesUrls.notFound} element={<NotFoundPage />} />
        <Route path={RoutesUrls.businessTrips} element={<TablePage />} />
        <Route path={RoutesUrls.employers} element={<EmployersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
