import { useEffect, useState } from 'react';

import { Box, Button, Input, Labeled } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';

import { useNotification } from '~shared/ui';
import { useProfile, useSetProfile } from '~entities/profile';
import { useUser } from '~entities/user';

import { updateProfile } from '../../api';

export interface ProfileEditViewProps {}

export const ProfileEditView: React.FC<ProfileEditViewProps> = () => {
  const { t } = useTranslation();

  const setProfile = useSetProfile();
  const user = useUser();
  const profile = useProfile();
  const notification = useNotification();
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setTelephone(profile?.telephone);
      setEmail(profile?.email);
    }
  }, [profile]);

  const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value === ' ' ? '' : e.target.value;
    setTelephone(input);

    if (input !== profile?.telephone) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value === ' ' ? '' : e.target.value;
    input = input.replace(/[А-Яа-яЁё]/, '');
    setEmail(input);

    if (input && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (input !== profile?.email) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  };

  const handleUpdate = () => {
    updateProfile({
      telephone,
      email,
    })
      .then(({ data, error, message }) => {
        if (error && data === false) {
          console.error(message);
          notification.openNotification({ message, type: 'error' });

          return;
        }

        notification.openNotification({ message: t('notify.succesSaved'), type: 'success' });

        if (user?.type) {
          setProfile({ role: user.type, id: 0 });
        }

        setChanged(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  return (
    <>
      {notification.contextHolder}
      <Box title={t('profile:contactData')}>
        <div className="flex gap-6 sm:grid sm:gap-4">
          <Labeled label={t('profile:phone_mobile')} required>
            <Input type="phone" value={telephone} onChange={handleChangeTel} />
          </Labeled>
          <Labeled
            label={t('profile:email')}
            required
            message={emailErr ? 'Не верный формат эл. почты' : ''}
            type="danger"
          >
            <Input
              type="email"
              value={email}
              onChange={handleChangeEmail}
              status={emailErr ? 'error' : ''}
            />
          </Labeled>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleUpdate} disabled={!changed || !telephone || !email || emailErr}>
            {t('actions.save')}
          </Button>
        </div>
      </Box>
    </>
  );
};
