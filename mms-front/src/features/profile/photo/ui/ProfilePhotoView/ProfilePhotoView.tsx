import { useEffect, useState } from 'react';

import { ImageUpload, SN } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n';

import { useProfile, useSetProfile } from '~entities/profile';
import { useUser } from '~entities/user';

import { updatePhoto } from '../../api';

export interface ProfilePhotoViewProps {}

export const ProfilePhotoView: React.FC<ProfilePhotoViewProps> = () => {
  const { t } = useTranslation();
  const setProfile = useSetProfile();
  const profile = useProfile();
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const baseUrl = 'http://mon.sc.on.kg/elumutu/api/personal/photo/lg/';

  useEffect(() => {
    if (profile?.foto) {
      setUrl(baseUrl + profile?.foto);
    }
  }, [profile?.foto]);

  const handleChange = (e: any) => {
    setLoading(true);

    const file = e.file.originFileObj;

    updatePhoto({
      selectedFile: file,
    })
      .then(({ data, error, message }) => {
        if (error && data === false) {
          console.error(message);

          return;
        }

        if (user?.type) {
          setProfile({ role: user.type, id: 0 });
        }

        setTimeout(() => {
          setLoading(false);
        }, 300);

        setUrl(baseUrl + profile?.foto);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ImageUpload
      url={url}
      onChange={handleChange}
      loading={loading}
      uploadText={t('actions.upload') || ''}
      onError={<SN surname={profile?.surname} name={profile?.name} size={48} />}
    />
  );
};
