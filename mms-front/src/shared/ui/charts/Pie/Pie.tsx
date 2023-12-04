// @ts-nocheck
// import { Pie as AntPie, PieConfig } from '@ant-design/plots';
import AntPie, { PieConfig } from '@ant-design/plots/es/components/pie';

import { FC } from 'react';

import { Tooltip } from '~shared/ui';

import styles from './pie.module.scss';

export type Datum = Record<string, any>;

type PieChartData = {
  type: string;
  value: number;
  color: string;
};

interface PieProps extends PieConfig {
  data: PieChartData[];
  discription?: string;
  // angleField?: string;
  // colorField?: string;
}

export const Pie: FC<PieProps> = ({
  data,
  angleField = 'value',
  colorField = 'type',
  height = 130,
  width = 130,
  discription = '',
}) => {
  const total = data.reduce((sum, current) => sum + current.value, 0);

  if (!data || data.length === 0) {
    return null;
  }

  const config = {
    appendPadding: 0,
    data: data.filter((x) => x.value > 0),
    angleField,
    colorField,
    color: function (d: Datum) {
      return data.filter((x) => x.type === d.type)[0]?.color;
    },
    radius: 1,
    innerRadius: 0.5,
    height,
    width,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 11,
      },
    },
    autoFit: true,

    pieStyle: {
      lineWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.16)',
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      cursor: 'pointer',
    },
    statistic: false,
    legend: false,
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.total}>
        {total} <span>{discription}</span>
      </h1>
      <div className={styles.pie}>
        <AntPie {...config} className="lmsPie" />
        <div className={styles.legends}>
          {data
            .filter((a) => a.value > 0)
            ?.map((item) => {
              return (
                <Tooltip
                  zIndex={2}
                  key={item?.type}
                  color={item?.color}
                  title={
                    <div className="flex gap-4 text-md">
                      <p>{item?.type}: </p>
                      <strong>{item?.value}</strong>
                    </div>
                  }
                >
                  <div className={styles.legend_row}>
                    <div className={styles.circle} style={{ background: item?.color }} />
                    <p>{item?.type}: </p>
                    <strong>{item?.value}</strong>
                  </div>
                </Tooltip>
              );
            })}
        </div>
      </div>
    </div>
  );
};
