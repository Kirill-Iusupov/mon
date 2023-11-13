import { FC, useEffect } from 'react';

import { DataFillView, useDataFill, useSetDataFill } from '~entities/dataFill';

export interface DataFillProps extends Partial<ComponentWithChild> {}

export const DataFill: FC<DataFillProps> = () => {
  const dataFill = useDataFill();
  const setDataFill = useSetDataFill();

  useEffect(() => {
    if (!dataFill) {
      setDataFill();
    }
  }, [dataFill, setDataFill]);

  if (!dataFill) {
    return <div>Loading</div>;
  }

  return <DataFillView dataFill={dataFill} />;
};
