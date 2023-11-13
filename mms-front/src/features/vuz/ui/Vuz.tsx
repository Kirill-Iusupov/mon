import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IUniversity } from '~features/vuz/model/types';
import { getUniv, putUniv } from '~features/vuz/api';
import { Box, Button, Input, Labeled, Textarea, useNotification } from '~shared/ui';

export const Vuz: FC = () => {
  const notification = useNotification();
  const { i18n, t } = useTranslation();
  const [formUniversity, setFormUniversity] = useState<IUniversity>({
    id_challenger_text: null,
    university: '',
    essay: '',
    speciality: '',
    additional: '',
  });

  const [countEssay, setCountEssay] = useState<number>(0);

  const [data, setData] = useState<IUniversity>();
  // const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    getUniversities();
  }, []);

  const getUniversities = async () => {
    const data = await getUniv(i18n.language);

    if (data.length) {
      setCountEssay(data[0].essay.split(' ').filter((item: string) => item !== '').length);
      setFormUniversity(data[0]);
      setData(data[0]);
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valueLength = e.target.value.split(' ').filter((item) => item !== '').length;

    if (data) {
      switch (e.target.name) {
        case 'university':
          if (data[e.target.name] !== e.target.value) {
            // setChanged(true);
          } else {
            // setChanged(false);
          }

          break;

        case 'speciality':
          if (data[e.target.name] !== e.target.value) {
            // setChanged(true);
          } else {
            // setChanged(false);
          }

          break;

        case 'essay':
          if (data[e.target.name] !== e.target.value) {
            // setChanged(true);
          } else {
            // setChanged(false);
          }

          break;

        case 'additional':
          if (data[e.target.name] !== e.target.value) {
            // setChanged(true);
          } else {
            // setChanged(false);
          }

          break;

        default:
        // setChanged(false);
      }
    } else {
      // setChanged(true);
    }

    if (e.target.name === 'essay') {
      if (valueLength <= 500) {
        setCountEssay(valueLength);
        setFormUniversity((pre) => (pre = { ...pre, [e.target.name]: e.target.value }));
      }

      return;
    }

    setFormUniversity((pre) => (pre = { ...pre, [e.target.name]: e.target.value }));
  };

  const handleUniv = async () => {
    const { university, essay, speciality, additional } = formUniversity;

    if (university.trim().length && essay.trim().length && speciality.trim().length) {
      const data = await putUniv(
        i18n.language,
        university.trim(),
        essay.trim(),
        speciality.trim(),
        additional.trim()
      );

      if (countEssay < 249) {
        return notification.openNotification({
          message: t('vuz:essayNotify'),
          type: 'warning',
        });
      }

      if (data) {
        return notification.openNotification({
          message: t('cm:notify.succesSaved'),
          type: 'success',
        });
      }

      return notification.openNotification({ message: t('cm:notify.error'), type: 'warning' });
    }

    notification.openNotification({ message: t('cm:notify.full'), type: 'warning' });
  };

  return (
    <>
      {notification.contextHolder}
      <Box>
        <Labeled label={t('vuz:nameVuz')} required>
          <Input onChange={change} name="university" value={formUniversity.university} />
        </Labeled>
        <Labeled label={t('vuz:speciality')} required>
          <Input onChange={change} name="speciality" value={formUniversity.speciality} />
        </Labeled>
        <Labeled label={t('vuz:essay')} required>
          <Textarea onChange={change} name="essay" value={formUniversity.essay} />
          <div className="text-[14px]">{countEssay}/250-500</div>
        </Labeled>
        <Labeled label={t('vuz:additional')}>
          <Textarea onChange={change} name="additional" value={formUniversity.additional} />
        </Labeled>
        <div className="flex justify-end">
          <Button
            onClick={handleUniv}
            // disabled={!formUniversity?.essay || !formUniversity?.speciality || !changed}
          >
            {t('cm:actions.save')}
          </Button>
        </div>
      </Box>
    </>
  );
};
