import { Space, Table } from 'antd';
import { atom, useAtom } from 'jotai';

import { FC } from 'react';

import { AddModalBusinessTrip } from '~widgets/add-modal';
import { Filter } from '~widgets/filter';

const visAtom = atom(false);

export const EmployerTablePage: FC<{ data: any }> = ({ data }) => {
  const [vis, setVis] = useAtom(visAtom);

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cотрудник',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Название командировки',
      dataIndex: 'business_ru',
      key: 'Название командировки',
    },
    {
      title: 'Время командировки',
      children: [
        {
          title: 'Дата начала',
          dataIndex: 'beg_date',
        },
        {
          title: 'Дата окончания',
          dataIndex: 'end_date',
        },
      ],
      key: 'Время командировки',
    },
    {
      title: 'Страна',
      dataIndex: 'country',
      key: 'Страна',
    },
    {
      title: 'Вид командировки',
      dataIndex: 'business_trip',
      key: 'Вид командировки',
    },
    {
      title: 'Тип командировки',
      dataIndex: 'business_type',
      key: 'Тип командировки',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <button className="p-[5px] text-white rounded">Удалить</button>
          <button className="p-[5px] text-white rounded">Редактировать</button>
        </Space>
      ),
    },
  ];

  const handleVis = () => {
    setVis(!vis);
  };

  return (
    <>
      <div className={vis ? 'absolute z-50' : 'hidden'}>
        <AddModalBusinessTrip set={handleVis} />
      </div>
      <Filter handleVis={handleVis} page="bt" role="admin" />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
