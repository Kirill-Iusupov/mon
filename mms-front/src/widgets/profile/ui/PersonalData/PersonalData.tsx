import { FC, useEffect } from 'react';

import { ProfileDetailView, useProfile, useSetProfile } from '~entities/profile';
import { useUser } from '~entities/user';

export interface PersonalDataProps extends Partial<ComponentWithChild> {
  id?: number;
}

export const PersonalData: FC<PersonalDataProps> = ({ id }) => {
  const profile = useProfile();
  const user = useUser();
  const setProfile = useSetProfile();

  useEffect(() => {
    if (profile === null) {
      if (user?.type) {
        setProfile({ role: user.type, id: id ? id : 0 });
      }
    }
  }, [setProfile, profile, user, id]);

  if (!profile) {
    return <div>Loading</div>;
  }

  return <ProfileDetailView profile={profile} />;
};
