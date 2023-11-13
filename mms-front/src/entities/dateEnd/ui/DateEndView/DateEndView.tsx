import { FC, useEffect, useState } from 'react';

import { useTranslation } from '~shared/lib/i18n';

import { Box, TimerChart } from '~shared/ui';

import { IDateEnd } from '../../api';

export interface DateEndViewProps {
  dateStart: any;
  dateEnd: IDateEnd;
}

interface TimeDisplayValuesType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const DateEndView: FC<DateEndViewProps> = ({ dateEnd }) => {
  const [timeDisplay, setTimeDisplay] = useState<TimeDisplayValuesType | null>(null);
  const totalDays = 30;
  const { t } = useTranslation();

  const generateTimeDisplay = (): TimeDisplayValuesType => {
    const rightJustNow = new Date().getTime();
    const runway = new Date(dateEnd.dates).getTime() - rightJustNow;
    const runwayT = runway > 0 ? runway : 0;
    const stateObj = {
      days: Math.floor(runwayT / (1000 * 60 * 60 * 24)),
      hours: Math.floor((runwayT % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((runwayT % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((runwayT % (1000 * 60)) / 1000),
    };

    return stateObj;
  };

  useEffect(() => {
    const timerID = setInterval(() => setTimeDisplay(generateTimeDisplay), 1000);

    return () => clearInterval(timerID);
  });

  return (
    <Box title={t('Timer.title')}>
      <div className="grid grid-cols-4 gap-6  justify-center  items-center sm:grid-cols-2 ">
        <TimerChart label={t('Timer.days') || ''} total={totalDays} value={timeDisplay?.days} />
        <TimerChart label={t('Timer.hours') || ''} total={24} value={timeDisplay?.hours} />
        <TimerChart label={t('Timer.minutes') || ''} total={60} value={timeDisplay?.minutes} />
        <TimerChart label={t('Timer.seconds') || ''} total={60} value={timeDisplay?.seconds} />
      </div>
    </Box>
  );
};
