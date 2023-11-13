import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Box, Button, Input, Labeled, Line } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n/i18n';
import { useNotification } from '~shared/ui';
import { useInfo, useSetInfo } from '~entities/info';

import {
  RegionSelector,
  // useRegion,
  useRegionList,
  // useSetRegion,
  // useSetRegionList,
} from '~entities/region';
import {
  DistrictSelector,
  // useDistrict,
  useDistrictList,
  // useSetDistrict,
  useSetDistrictList,
} from '~entities/district';
import {
  EducationSelector,
  // useEducation,
  useEducationList,
  // useSetEducation,
  // useSetEducationList,
} from '~entities/education';
import {
  DirectionSelector,
  // useDirection,
  useDirectionList,
  // useSetDirection,
  useSetDirectionList,
} from '~entities/direction';

import { LangSelector, useLangList } from '~entities/lang';

import { useProfile } from '~entities/profile';

import { updateInfo } from '../../api';

import styles from './profile.module.scss';

export interface InfoEditViewProps {}

function getAge(dateString: Date) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export const InfoEditView: React.FC<InfoEditViewProps> = () => {
  const { t } = useTranslation();

  const [regionValue, setRegionValue] = useState<number | null>(null);
  const [districtValue, setDistrictValue] = useState<number | null>(null);
  const [addressValue, setAddressValue] = useState<string>('');
  const [educationValue, setEducationValue] = useState<number | null>(null);
  const [directionValue, setDirectionValue] = useState<number | null>(null);

  const [kgValue, setKgValue] = useState<number | null>(null);
  const [ruValue, setRuValue] = useState<number | null>(null);
  const [enValue, setEnValue] = useState<number | null>(null);
  const [otherValue, setOtherValue] = useState<number | null>(null);

  const langList = useLangList();

  const setInfo = useSetInfo();
  const info = useInfo();
  const profile = useProfile();

  const notification = useNotification();

  const regionList = useRegionList();
  // const region = useRegion();
  // const setRegion = useSetRegion();
  // const setRegionList = useSetRegionList();

  const districtList = useDistrictList();
  // const district = useDistrict();
  // const setDistrict = useSetDistrict();
  const setDistrictList = useSetDistrictList();

  const educationList = useEducationList();
  // const education = useEducation();
  // const setEducation = useSetEducation();
  // const setEducationList = useSetEducationList();

  const directionList = useDirectionList();
  // const direction = useDirection();
  // const setDirection = useSetDirection();
  const setDirectionList = useSetDirectionList();

  // const [message, setMessage] = useState('');
  // const [telephone, setTelephone] = useState('');
  // const [email, setEmail] = useState('');

  const age = useMemo(() => {
    return profile?.birth_day ? getAge(profile?.birth_day) : 0;
  }, [profile]);

  const changeRegion = (value: any) => {
    setRegionValue(value);
    setDistrictValue(null);
    setDistrictList({ region: value });
  };

  const changeDistrict = (value: any) => setDistrictValue(value);

  const changeAddress = (e: ChangeEvent<HTMLInputElement>) => setAddressValue(e.target.value);

  const changeEducation = (value: any) => {
    setEducationValue(value);
    setDirectionList({ education: value });
  };

  const changeDirection = (value: any) => setDirectionValue(value);
  const changeKg = (value: any) => setKgValue(value);
  const changeRu = (value: any) => setRuValue(value);
  const changeEn = (value: any) => setEnValue(value);
  const changeOther = (value: any) => setOtherValue(value);

  const handleUpdate = () => {
    // notification.openNotification('error', 'Select faculty');
    // notification.closeNotification();
    // if (!info) {
    //   return;
    // }
    //
    // updateInfo({
    //   district: info.id_district_city,
    //   address: info.address,
    //   education: info.id_education_level,
    //   direction: info.id_direction,
    //   kg: Number(info.kyrgyz),
    //   ru: Number(info.russian),
    //   en: Number(info.english),
    //   other: Number(info.other),
    // })
    //   .then(({ data, error, message }) => {
    //     if (error && data === false) {
    //       console.error(message);
    //
    //       return;
    //     }
    //
    //     setInfo();
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => {});

    if (
      !(
        regionValue &&
        districtValue &&
        addressValue.trim().length &&
        kgValue &&
        ruValue &&
        educationValue
      )
    ) {
      return notification.openNotification({ message: t('allInfo:full'), type: 'warning' });
    }

    updateInfo({
      district: districtValue,
      address: addressValue.trim(),
      education: educationValue,
      direction: directionValue,
      kg: Number(kgValue),
      ru: Number(ruValue),
      en: Number(enValue),
      other: Number(otherValue),
    })
      .then(({ data, error }) => {
        if (error && data === false) {
          return;
        }

        setInfo({ role: 1, id: 0 });
        notification.openNotification({ message: t('cm:notify.succesSaved'), type: 'success' });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (info?.id_challenger_info) {
      setRegionValue(info?.id_region || null);
      setDistrictValue(info?.id_district_city || null);
      setAddressValue(info?.address || '');
      setEducationValue(info?.id_education_level || null);
      setDirectionValue(info?.id_direction || null);
      setKgValue(Number(info?.kyrgyz));
      setRuValue(Number(info?.russian));
      setEnValue(Number(info?.english));
      setOtherValue(Number(info?.other));
      setDirectionList({ education: info?.id_education_level || null });
      setDistrictList({ region: info?.id_region || null });
    }
  }, [info]);

  useEffect(() => {
    if (directionList?.length) {
      setDirectionValue(info?.id_direction || null);
    }
  }, [directionList]);

  return (
    <>
      {notification.contextHolder}
      <Box>
        <h3 className="text-[18px]">{t('allInfo:address')}</h3>

        <RegionSelector
          onRegionSelect={changeRegion}
          value={regionValue}
          required
          label={t('allInfo:region')}
          regionList={regionList || []}
        />

        <DistrictSelector
          onDistrictSelect={changeDistrict}
          value={districtValue}
          label={t('allInfo:district')}
          required
          districtList={districtList || []}
        />

        <Labeled label="Адрес" required>
          <Input value={addressValue} onChange={changeAddress} />
        </Labeled>

        <Line />

        <h3 className="text-[18px]">{t('allInfo:learn')}</h3>

        <EducationSelector
          onEducationSelect={changeEducation}
          required
          value={educationValue}
          label={t('allInfo:education')}
          // if age > 40 then only PHD
          educationList={
            (age > 45
              ? []
              : age >= 40
              ? educationList?.filter((x) => x.id_education_level === 2)
              : educationList) || []
          }
        />

        <DirectionSelector
          onDirectionSelect={changeDirection}
          value={directionValue}
          required
          label={t('allInfo:direction')}
          directionList={age < 46 ? directionList || [] : []}
        />

        <Line />

        <h3 className="text-[18px]">{t('allInfo:lang')}</h3>

        <div className={styles.lang}>
          <LangSelector
            onLangSelect={changeKg}
            value={kgValue}
            label={t('allInfo:kg')}
            langList={langList}
            required
          />

          <LangSelector
            onLangSelect={changeRu}
            value={ruValue}
            label={t('allInfo:ru')}
            langList={langList}
            required
          />
        </div>

        <div className={styles.lang}>
          <LangSelector
            onLangSelect={changeEn}
            value={enValue}
            label={t('allInfo:en')}
            langList={langList}
            required
          />

          <LangSelector
            onLangSelect={changeOther}
            value={otherValue}
            label={t('allInfo:other')}
            langList={langList}
          />
        </div>

        <div className="flex justify-end">
          <Button
            disabled={
              !(
                regionValue &&
                districtValue &&
                addressValue.trim().length &&
                kgValue &&
                ruValue &&
                educationValue &&
                otherValue
              )
            }
            onClick={handleUpdate}
          >
            {t('cm:actions.save')}
          </Button>
        </div>
      </Box>
    </>
  );
};
