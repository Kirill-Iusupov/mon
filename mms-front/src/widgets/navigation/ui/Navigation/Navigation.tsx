import { FC, useEffect, useState } from 'react';

import { useSetCollapsed } from '~entities/burger';

import { useCollapsed } from '~entities/burger';
// import { LinksView } from '~entities/links';
// import { usePhoto, useSetPhoto } from '~entities/photo';
import { useProfile } from '~entities/profile';
import { SiderUser, useUser } from '~entities/user';
import { useTranslation } from '~shared/lib/i18n';

import { RoutesUrls } from '~shared/lib/router';

import { SN, Sider, SiderButton, TabBar, TabbarButton, useWindowInnerWidth } from '~shared/ui';
import {
  DocsIcon,
  GeneralInfoIcon,
  HomeIcon,
  LogoutIcon,
  ManualIcon,
  PersonalDataIcon,
  RegulationsIcon,
  SettingsIcon,
  UniversityIcon,
} from '~shared/ui/Icons/icons';

export interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
  const collapsedAtom = useCollapsed();
  const setCollapsed = useSetCollapsed();
  const user = useUser();
  const [photo, setPhoto] = useState<string>('');
  const profile = useProfile();
  const windowWidth = useWindowInnerWidth();
  const { t } = useTranslation();

  useEffect(() => {
    if (profile && user?.type === 1) {
      setPhoto(
        `http://mon.sc.on.kg/elumutu/api/personal/photo/lg/${profile?.foto}?t=${Date.now()}`
      );
    }
  }, [profile, user]);

  useEffect(() => {
    if (windowWidth <= 768) {
      if (collapsedAtom) {
        document.body.style.overflow = 'unset';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsedAtom]);

  const routes = [
    {
      title: t('cm:routes.home'),
      path: RoutesUrls.home,
      icon: <HomeIcon />,
      isMon: true,
      isAparat: true,
      isApplicant: true,
      isTabbar: true,
    },
    {
      title: t('cm:routes.personal'),
      path: RoutesUrls.personal,
      icon: <PersonalDataIcon />,
      isMon: false,
      isAparat: false,
      isApplicant: true,
      isTabbar: true,
    },
    {
      title: t('cm:routes.info'),
      path: RoutesUrls.info,
      icon: <GeneralInfoIcon />,
      isMon: false,
      isAparat: false,
      isApplicant: true,
      isTabbar: true,
    },
    {
      title: t('cm:routes.doc'),
      path: RoutesUrls.doc,
      icon: <DocsIcon />,
      isMon: false,
      isAparat: false,
      isApplicant: true,
      isTabbar: true,
    },
    {
      title: t('cm:routes.university'),
      path: RoutesUrls.university,
      icon: <UniversityIcon />,
      isMon: false,
      isAparat: false,
      isApplicant: true,
      isTabbar: true,
    },
    {
      title: t('cm:routes.regulations'),
      path: RoutesUrls.regulations,
      icon: <RegulationsIcon />,
      isMon: true,
      isAparat: true,
      isApplicant: true,
      isTabbar: false,
    },
    {
      title: t('cm:routes.manual'),
      path: RoutesUrls.manual,
      icon: <ManualIcon />,
      isMon: true,
      isAparat: true,
      isApplicant: true,
      isTabbar: false,
    },
  ];

  const settings = [
    { title: t('cm:bottomLinks.settings'), path: RoutesUrls.settings, icon: <SettingsIcon /> },
    { title: t('cm:bottomLinks.logout'), path: RoutesUrls.logout, icon: <LogoutIcon /> },
  ];

  const handleClickButton = () => {
    if (windowWidth <= 768) {
      setCollapsed(!collapsedAtom);
    }
  };

  return (
    <>
      <Sider
        user={
          <SiderUser
            photo={photo}
            fio={`${user?.s} ${user?.n} ${user?.p ? user?.p : ''}`}
            role={
              user?.type === 2
                ? t('cm:role.mon')
                : user?.type === 3
                ? t('cm:role.aparat')
                : user?.type === 4
                ? t('cm:role.expert')
                : t('cm:role.applicant')
            }
            collapsed={collapsedAtom}
            onError={<SN surname={user?.s || ''} name={user?.n || ''} size={24} />}
          />
        }
        routes={routes
          .filter(
            (x) => x[user?.type === 2 ? 'isMon' : user?.type === 3 ? 'isAparat' : 'isApplicant']
          )
          .map((item) => {
            return (
              <SiderButton
                key={item.path}
                path={item.path}
                title={item.title}
                icon={item.icon}
                collapsed={collapsedAtom}
                onClick={handleClickButton}
              />
            );
          })}
        // links={<LinksView />}
        links={null}
        settings={settings?.map((item) => {
          return (
            <SiderButton
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              collapsed={collapsedAtom}
            />
          );
        })}
        collapsed={collapsedAtom}
      />

      {windowWidth <= 768 && user?.type === 1 ? (
        <TabBar
          routes={routes
            .filter(
              (x) =>
                x[user?.type === 2 ? 'isMon' : user?.type === 3 ? 'isAparat' : 'isApplicant'] &&
                x.isTabbar === true
            )
            .map((item) => {
              return <TabbarButton key={item.path} path={item.path} icon={item.icon} />;
            })}
        />
      ) : null}
    </>
  );
};
