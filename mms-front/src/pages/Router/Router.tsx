import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';
import { RequireAuth } from '~shared/lib/auth';

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

export const redirectUrl = RoutesUrls.login;

const createProtectedElement = (component: JSX.Element) => (
  <RequireAuth loginPath={RoutesUrls.login}>{component}</RequireAuth>
);

export const Router = () => {
  const location = useLocation();
  const effectCalled = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      // checkSuccessHandler();
      navigate(RoutesUrls.employers);
      effectCalled.current = true;
    }
  }, [navigate]);

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
