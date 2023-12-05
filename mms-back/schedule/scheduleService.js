const db = require("../utils/db");

async function list(lang) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_department_employee_grid($1);",
      [lang]
    );
    if (rowCount) return rows;
    return false;
  } catch (err) {
    console.log("error schedule list", err.message);
    return false;
  }
}
async function scheduleIUD(iud, id, departmentId, employeeId, postId) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_department_employee_grid_iud($1,$2,$3,$4,$5);",
      [iud, id, departmentId, employeeId, postId]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error schedule scheduleIUD", err.message);
    return false;
  }
}

module.exports = {
  list,
  scheduleIUD,
};
