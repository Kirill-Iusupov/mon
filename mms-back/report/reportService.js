const db = require("../utils/db");

async function list(lang) {
  try {
    const { rows } = await db.query(
      "select * from public.fn_business_report_sel($1);",
      [lang]
    );
    return rows;
  } catch (err) {
    console.log("error report list", err.message);
    return false;
  }
}
async function reportIUD(iud, id, businessId, businessReport) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_business_report_grid_uid($1,$2,$3,$4);",
      [iud, id, businessId, businessReport]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error report reportIUD", err.message);
    return false;
  }
}

module.exports = {
  list,
  reportIUD,
};
