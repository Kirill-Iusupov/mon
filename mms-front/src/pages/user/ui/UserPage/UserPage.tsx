import { FC, useEffect } from 'react';

import { UserPhoto, usePhoto, useSetPhoto } from '~entities/photo';
import { useUser } from '~entities/user';

import { Box } from '~shared/ui';

export interface UserPageProps {}

export const UserPage: FC<UserPageProps> = () => {
  const user = useUser();
  const photo = usePhoto();
  const setPhoto = useSetPhoto();

  useEffect(() => {
    if (photo === null) {
      setPhoto();
    }
  }, [setPhoto, photo]);

  if (!user || !photo) {
    return <div style={{ display: !user ? 'block' : 'none' }}>Loading</div>;
  }

  return (
    <Box
      styles={{
        flex: '1 1 0%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <Box>
        <UserPhoto avatar={photo} />
      </Box>
      <Box>
        {user?.s} {user?.n} {user?.p}
      </Box>
    </Box>
  );
};
