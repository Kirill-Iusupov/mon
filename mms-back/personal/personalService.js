const db = require("../utils/db");

async function list(lang) {
  try {
    const { rowCount, rows } = await db.query(
      "SELECT * FROM fn_employee_grid($1);",
      [lang]
    );
    if (rowCount) return rows;
    return false;
  } catch (err) {
    console.log("error personal list", err.message);
    return false;
  }
}

async function empInsert(surname, name, patronymic, birthDate, pin, password) {
  try {
    const { rows, rowCount } = await db.query(
      "SELECT * FROM fn_employee_grid_ins($1,$2,$3,$4,$5,$6);",
      [surname, name, patronymic, birthDate, pin, password]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error personal empInsert", err.message);
    return false;
  }
}
async function empUpdate(id, surname, name, patronymic, birthDate, pin) {
  try {
    const iud = 1; //update
    const { rows, rowCount } = await db.query(
      "SELECT * FROM fn_employee_grid_iud($1,$2,$3,$4,$5,$6,$7);",
      [iud, id, surname, name, patronymic, birthDate, pin]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error personal empUpdate", err.message);
    return false;
  }
}
async function empDelete(id) {
  try {
    const iud = 2, //delete
      surname = "",
      name = "",
      patronymic = "",
      birthDate = "2002-02-02",
      pin = 1234;

    const { rows, rowCount } = await db.query(
      "SELECT * FROM fn_employee_grid_iud($1,$2,$3,$4,$5,$6,$7);",
      [iud, id, surname, name, patronymic, birthDate, pin]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error personal empDelete", err.message);
    return false;
  }
}
async function empPassword(id, password) {
  try {
    const { rowCount } = await db.query(
      "UPDATE employee SET password = LTRIM(RTRIM($1)) WHERE employee.id_employee = $2;",
      [password, id]
    );
    if (rowCount) return true;
    return false;
  } catch (err) {
    console.log("error personal empPassword", err.message);
    return false;
  }
}

module.exports = {
  list,
  empInsert,
  empUpdate,
  empDelete,
  empPassword,
};
