import { Space, Table } from 'antd';
import { atom, useAtom } from 'jotai';
import { FC } from 'react';

import { AddModalBusinessTrip } from '~widgets/add-modal';
import { Filter } from '~widgets/filter';

const visAtom = atom(false);

export const UserTablePage: FC<{ data: any }> = ({ data }) => {
  const [vis, setVis] = useAtom(visAtom);

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Сотрудник',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Структура',
      key: 'structure',
    },
    {
      title: 'Должность',
      key: 'job',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <button className="p-[5px] text-white rounded">Удалить</button>
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
      <Table columns={columns} dataSource={data} />
    </>
  );
};
