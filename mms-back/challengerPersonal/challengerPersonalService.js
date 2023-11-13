const db = require("../utils/db");

async function dataFill(idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger_date($1);",
      [idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challengerProfile dataFill", err.message);
    return false;
  }
}

async function detailSave(idChal, telephone, email) {
  try {
    const resUpdate = await db.query("call sp_challenger_upd($1,$2,$3);", [
      idChal,
      telephone,
      email,
    ]);
    return resUpdate.error ? false : true;
  } catch (err) {
    console.log("error challengerPersonal detailSave", err.message);
    return false;
  }
}
async function detail(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challengerPersonal detail", err.message);
    return false;
  }
}

async function updatePassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'UPDATE public.challenger SET "password"=$2 WHERE id_challenger=$1;',
      [idChal, password]
    );
    return rows;
  } catch (err) {
    console.log("error challenger updatePassword", err.message);
    return false;
  }
}
async function checkPassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'SELECT EXISTS(select 1 from  public.challenger WHERE id_challenger=$1 and "password"=$2);',
      [idChal, password]
    );
    if (rows.length > 0) {
      const { exists } = rows[0];
      return exists;
    }
    return false;
  } catch (err) {
    console.log("error challenger checkPassword", err.message);
    return false;
  }
}

async function photo(idChal, photoPath) {
  try {
    const resPhoto = await db.query('call "sp_challenger_foto"($1, $2)', [
      idChal,
      photoPath,
    ]);
    // const { rows, rowCount } = await db.query(
    //   `
    // WITH upsert AS(
    //     UPDATE  public.employee_photo SET employee_photo = $2
    //     WHERE id_employee = $1
    //     RETURNING *
    // )
    //     INSERT INTO public.employee_photo (id_employee, employee_photo)
    //     select $1, $2
    //     WHERE NOT EXISTS(SELECT * FROM upsert)
    //     RETURNING * `,
    //   [idChal, photoPath]
    // );
    // return rows || rowCount;

    return resPhoto.error ? false : true;
  } catch (err) {
    console.log("error challenger photo", err.message);
    return false;
  }
}

module.exports = {
  dataFill,
  detail,
  detailSave,
  photo,

  updatePassword,
  checkPassword,
};
