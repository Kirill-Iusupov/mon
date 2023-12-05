const db = require("../utils/db");

async function list() {
  try {
    const { rows } = await db.query(
      "select * from public.fn_country_grid();",
      []
    );
    return rows;
  } catch (err) {
    console.log("error country list", err.message);
    return false;
  }
}
async function countryIUD(iud, id, countryRu, countryKg) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_country_grid_iud($1,$2,$3,$4);",
      [iud, id, countryRu, countryKg]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error country countryIUD", err.message);
    return false;
  }
}

module.exports = {
  list,
  countryIUD,
};
