import { FC } from 'react';

export const Filter: FC<{ handleVis: () => void; page: 'bt' | 'emp'; role: 'admin' | 'user' }> = ({
  handleVis,
  page,
  role,
}) => {
  return (
    <div className="flex justify-between">
      {page === 'emp' ? (
        <select name="filter" id="" className="w-[200px] p-[3px]">
          <option value="">Все</option>
          <option value="">Активные</option>
          <option value="">Неактивные</option>
        </select>
      ) : (
        <div>
          <select name="filter" id="" className="w-[200px] p-[3px] mr-[24px]">
            <option value="">Все</option>
            <option value="">Служебные</option>
            <option value="">Пригласительные</option>
          </select>
          <select name="filter" id="" className="w-[200px] p-[3px]">
            <option value="">Все</option>
            <option value="">Внешняя</option>
            <option value="">Внутренняя</option>
          </select>
        </div>
      )}
      {role === 'admin' ? (
        <button
          className="w-[120px] p-[10px] rounded text-white bg-[green]"
          onClick={() => handleVis()}
        >
          Добавить
        </button>
      ) : null}
    </div>
  );
};
