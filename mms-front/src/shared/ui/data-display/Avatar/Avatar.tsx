import { FC } from 'react';
import AntAvatar, { AvatarProps } from 'antd/es/avatar';

export const Avatar: FC<AvatarProps> = ({ src, shape = 'circle', ...props }) => {
  return <AntAvatar {...props} src={src} shape={shape} />;
};

Avatar.displayName = 'Avatar';
