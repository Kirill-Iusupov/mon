import { FC } from 'react';

import { ProfileShortView } from '~entities/profile';
import { ProfilePhotoView } from '~features/profile';

export interface PersonalShortDataProps extends Partial<ComponentWithChild> {}

export const PersonalShortData: FC<PersonalShortDataProps> = () => {
  return <ProfileShortView PhotoSlot={<ProfilePhotoView />} />;
};
