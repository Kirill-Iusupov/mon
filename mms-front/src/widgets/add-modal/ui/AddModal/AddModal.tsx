import { useAtom } from 'jotai';

import { FC, MutableRefObject, useRef } from 'react';

import { locAtom } from '~widgets/add-modal/';

export const AddModalBusinessTrip: FC<{ set: () => void }> = ({ set }) => {
  const [loc, setLoc] = useAtom(locAtom);

  const handleLoc = (e: any) => {
    setLoc(e.target.value);
  };

  const prikaz: MutableRefObject<any> = useRef();

  const prikazClick: () => void = () => {
    prikaz.current.click();
  };

  const handleHandle = (event: any) => {
    event.preventDefault();

    const getData = new FormData(event.currentTarget);

    const values = [...getData.values()];

    const isEmpty = values.includes('');

    if (isEmpty) {
      return;
    }

    event.currentTarget.reset();
  };

  return (
    <div
      className="top-0 left-0 bg-black/[.4] w-[100vw] h-[100vh] fixed z-50 flex justify-center items-center"
      onClick={() => set()}
    >
      <form
        className="border border-[2px] w-[400px] m-auto flex flex-col p-[20px] bg-white rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleHandle}
      >
        <input
          type="text"
          placeholder="Командировка"
          name="btName"
          className="p-[5px] border-solid"
        />
        <label className="my-[24px]" htmlFor="">
          Тип командировки
          <br />
          <select name="btType" id="" className="w-[100%] border-solid">
            <option value="job">Служебная</option>
            <option value="visit">Приглассительная</option>
          </select>
        </label>
        <label htmlFor="">
          Вид командировки
          <br />
          <select name="btLoc" id="" className="border-solid w-[100%]" onChange={handleLoc}>
            <option value="in">Внутренняя</option>
            <option value="out">Внешняя</option>
          </select>
        </label>
        {loc === 'out' ? (
          <label htmlFor="countrySelection" className="mt-[12px]">
            Страна
            <br />
            <select name="country" id="countrySelection" className="w-[100%]">
              <option value="usa">США</option>
              <option value="uk">Великобритания</option>
              <option value="ru">Россия</option>
              <option value="kz">Казахстан</option>
              <option value="bl">Белорусь</option>
              <option value="au">Австрия</option>
              <option value="aus">Австралия</option>
            </select>
          </label>
        ) : (
          <label htmlFor="regSelection" className="mt-[12px]">
            Область
            <br />
            <select name="region" id="regSelection" className="w-[100%]">
              <option value="c">Чуйская область</option>
              <option value="n">Нарынская область</option>
              <option value="o">Ошская область</option>
              <option value="i">Иссык-Кульская область</option>
              <option value="j">Жалал-Абадская область</option>
              <option value="t">Таласская область</option>
              <option value="b">Баткенская область</option>
            </select>
          </label>
        )}

        <div className="flex justify-between my-[24px]">
          <div>
            <label htmlFor="startDate" className="block">
              Дата начала
            </label>
            <input type="date" name="startDate" />
          </div>
          <div>
            <label htmlFor="endDate" className="block">
              Дата окончания
            </label>
            <input type="date" name="endDate" />
          </div>
        </div>
        <input
          type="text"
          placeholder="ФИО сотрудника"
          name="name"
          className="p-[5px] my-[24px] border-solid"
        />
        <input
          type="text"
          placeholder="№ и дата приказа"
          name="order"
          className="p-[5px] border-solid"
        />
        <input type="file" accept=".pdf, .doc, .docx" ref={prikaz} className="hidden" name="file" />
        <div onClick={() => prikazClick()} className="my-[24px]">
          Click
        </div>
        <div className="flex justify-around mt-[24px]">
          <button
            type="reset"
            className="border border-[2px] p-[5px] rounded-[10px] hover:text-[white] hover:bg-[blue]"
            onClick={() => set()}
          >
            Отменить
          </button>
          <button
            type="submit"
            className="border border-[2px] p-[5px] rounded-[10px] hover:text-[white] hover:bg-[blue]"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};
