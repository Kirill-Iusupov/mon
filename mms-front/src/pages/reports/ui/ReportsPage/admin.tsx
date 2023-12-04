import { Space, Table } from 'antd';
import { atom, useAtom } from 'jotai';

import { FC, MutableRefObject, useRef } from 'react';

import { Filter } from '~widgets/filter';

const visAtom = atom(false);

export const AdminTablePage: FC<{ data: any }> = ({ data }) => {
  const report: MutableRefObject<any> = useRef();

  const handleReport: () => void = () => {
    report.current.click();
  };

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
          <input
            type="file"
            ref={report}
            placeholder="Отчет"
            className="hidden"
            accept=".pdf, .doc, .docx"
          />
          <button onClick={() => handleReport()} className="p-[5px] text-white rounded">
            Выбрать отчет
          </button>
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
        {/* <ReportModal set={handleVis} /> */}
      </div>
      <Filter handleVis={handleVis} page="bt" role="admin" />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
