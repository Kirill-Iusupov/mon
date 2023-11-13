import { FC, useEffect } from 'react';

import { DateEndView, useDateEnd, useSetDateEnd } from '~entities/dateEnd';

export interface DateEndProps extends Partial<ComponentWithChild> {}

export const DateEnd: FC<DateEndProps> = () => {
  const dateEnd = useDateEnd();
  const dateStart = useDateEnd();
  const setDateEnd = useSetDateEnd();

  useEffect(() => {
    if (!dateEnd) {
      setDateEnd();
    }
  });

  if (!dateEnd) {
    return <div>Loading</div>;
  }

  return <DateEndView dateStart={dateStart} dateEnd={dateEnd} />;
};
