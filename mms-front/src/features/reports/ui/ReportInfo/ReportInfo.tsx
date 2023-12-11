import { FC } from 'react';

const style = 'w-[300px] border border-solid border-[2px] p-[5px] my-[16px]';

export const ReportInfo: FC<{ data: any; handleChange: (e: any) => void }> = ({
  data,
  handleChange,
}) => {
  return (
    <>
      <form className="flex flex-wrap items-center justify-between my-[]">
        <label htmlFor="start" className="flex flex-col w-[350px]">
          Start date:
          <input
            type="date"
            name="startDate"
            id="start"
            className="border-solid p-[5px]"
            value={data.startDate}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="end" className="flex flex-col w-[350px]">
          End date:
          <input
            type="date"
            id="end"
            name="endDate"
            className="border-solid p-[5px]"
            value={data.endDate}
            onChange={handleChange}
          />
        </label>
        <input
          type="text"
          placeholder="City"
          name="city"
          className={style}
          value={data.city}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          className={style}
          value={data.country}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Business trip name"
          name="btName"
          className={style}
          value={data.btName}
          onChange={handleChange}
        />
      </form>
    </>
  );
};
