import { Space, Table } from 'antd';
import { atom, useAtom } from 'jotai';

import { FC } from 'react';

import { AddModalBusinessTrip } from '~widgets/add-modal';
import { Filter } from '~widgets/filter';

const visAtom = atom(false);

export const AdminTablePage: FC<{ data: any }> = ({ data }) => {
  const [vis, setVis] = useAtom(visAtom);

  const columns = [
    {
      title: '№',
      dataIndex: 'id_employee',
      key: 'id',
    },
    {
      title: 'Ф.И.О.',
      children: [
        {
          dataIndex: 'surname',
          width: '0',
        },
        {
          width: '0',
          dataIndex: 'name',
        },
        {
          width: '0',
          dataIndex: 'patronymic',
        },
      ],
      key: 'name',
    },
    {
      title: 'ПИН',
      dataIndex: 'pin',
      key: 'pin',
    },
    {
      title: 'Дата рождения',
      key: 'birthDate',
      dataIndex: 'birth_date',
      render: (birth_date: string) => {
        const date = new Date(birth_date).toLocaleDateString();

        return <p>{date}</p>;
      },
    },
    {
      title: 'Активен',
      key: 'active',
      render: () => (
        <Space size="middle">
          <input type="checkbox" name="active" id="active" />
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <button className="p-[3px] rounded text-white">Редактировать</button>
          <button className="p-[3px] rounded text-white">Удалить</button>
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
      <Filter handleVis={handleVis} page="emp" role="admin" />
      <Table columns={columns} dataSource={data} bordered />
    </>
  );
};
