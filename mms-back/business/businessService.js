const db = require("../utils/db");

async function list(lang) {
  try {
    const { rows } = await db.query(
      "select * from public.fn_business_grid($1);",
      [lang]
    );
    return rows;
  } catch (err) {
    console.log("error business list", err.message);
    return false;
  }
}
async function businessIUD(
  iud,
  id,
  businessRu,
  businessKg,
  businessTypeId,
  businessTripId,
  employeeId,
  countryId,
  regionId,
  begDate,
  endDate,
  departmentId,
  order,
  orderFile,
  comment
) {
  try {
    const { rowCount, rows } = await db.query(
      // iud integer, id integer,
      // business_ru character varying, business_kg character varying,
      // id_business_type integer, id_business_trip integer,
      // id_employee integer,
      // id_country integer, id_region integer,
      // beg_date date, end_date date,
      // id_department integer,
      // "оrder" character varying, "оrder_file" character varying,
      // comment character varying

      "select * from public.fn_business_grid_iud($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",
      [
        iud,
        id,
        businessRu,
        businessKg,
        businessTypeId,
        businessTripId,
        employeeId,
        countryId,
        regionId,
        begDate,
        endDate,
        departmentId,
        order,
        orderFile,
        comment,
      ]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error business businessIUD", err.message);
    return false;
  }
}

module.exports = {
  list,
  businessIUD,
};
