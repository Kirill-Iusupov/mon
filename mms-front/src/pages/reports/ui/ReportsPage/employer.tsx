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
      title: 'ФИО сотрудника',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Название командировки',
      key: 'Название командировки',
    },
    {
      title: 'Время командировки',
      key: 'Время командировки',
    },
    {
      title: 'Страна',
      key: 'Страна',
    },
    {
      title: 'Вид командировки',
      key: 'Вид командировки',
    },
    {
      title: 'Тип командировки',
      key: 'Тип командировки',
    },
    {
      title: 'Отчет командировки',
      key: 'report',
      render: () => (
        <Space>
          <input type="file" placeholder="Отчет" />
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
      <Filter handleVis={handleVis} page="bt" role="user" />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
