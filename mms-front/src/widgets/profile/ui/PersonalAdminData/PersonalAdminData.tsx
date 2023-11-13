import { FC, ReactNode, useEffect } from 'react';

import { useProfile, useSetProfile } from '~entities/profile';
import { ProfileAdminView } from '~entities/profile/ui/ProfileAdminView';
import { useUser } from '~entities/user';
import { RoutesUrls, useNavigate } from '~shared/lib/router';
import { Breadcrumb, ChevronLeftlIcon } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';

export interface PersonalAdminDataProps extends Partial<ComponentWithChild> {
  id: number;
  editSlot: ReactNode;
  pdfSlot: ReactNode;
}

export const PersonalAdminData: FC<PersonalAdminDataProps> = ({ id, editSlot, pdfSlot }) => {
  const profile = useProfile();
  const user = useUser();
  const setProfile = useSetProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (profile === null) {
      if (user?.type) {
        setProfile({ role: user.type, id });
      }
    }
  }, [setProfile, profile]);

  if (!profile) {
    return <div>Loading</div>;
  }

  const goToBack = () => {
    navigate(RoutesUrls.home);
  };

  return (
    <div className="grid gap-6 md:gap-5 sm:gap-4">
      <div className="flex justify-between gap-4 sm:flex-col ">
        <Breadcrumb
          items={[
            {
              onClick: goToBack,
              title: (
                <span className="cursor-pointer flex gap-4">
                  <ChevronLeftlIcon />
                  {t('mon.challengers')}
                </span>
              ),
            },
            {
              title: `${profile?.surname} ${profile?.name} ${profile?.patronymic}`,
            },
          ]}
        />
        {pdfSlot}
      </div>
      {/* expert cant edit */}
      <ProfileAdminView profile={profile} editSlot={user?.type === 4 ? null : editSlot} />
    </div>
  );
};
