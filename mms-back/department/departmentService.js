const db = require("../utils/db");

async function list() {
  try {
    const { rows } = await db.query(
      "select * from public.fn_department_grid();",
      []
    );
    return rows;
  } catch (err) {
    console.log("error department list", err.message);
    return false;
  }
}
async function departmentIUD(iud, id, departmentRu, departmentKg) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_department_grid_iud($1,$2,$3,$4);",
      [iud, id, departmentRu, departmentKg]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error department departmentIUD", err.message);
    return false;
  }
}

module.exports = {
  list,
  departmentIUD,
};
