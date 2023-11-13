import { FC } from 'react';

import { Avatar, AvatarProps } from '~shared/ui';
export interface UserPhotoProps extends AvatarProps {
  avatar: string;
}

export const UserPhoto: FC<UserPhotoProps> = ({ avatar, ...props }) => {
  return <Avatar alt="avatar" src={avatar} {...props} />;
};
