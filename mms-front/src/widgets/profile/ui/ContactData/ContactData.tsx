import { FC } from 'react';

import { ProfileEditView } from '~features/profile';

export interface ContactDataProps extends Partial<ComponentWithChild> {}

export const ContactData: FC<ContactDataProps> = () => {
  return <ProfileEditView />;
};
