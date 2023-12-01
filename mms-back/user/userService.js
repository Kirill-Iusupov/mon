const db = require("../utils/db");
const { md5 } = require("../utils/utils");

async function login(login, password) {
  try {
    const cryptoPass = password;
    // const cryptoPass = md5(password);
    const { rows } = await db.query("select * from fn_auth($1, $2);", [
      login,
      cryptoPass,
    ]);
    if (rows.length > 0) {
      const { id_employee, id_role, surname, name, patronymic } = rows[0];
      return { id: id_employee, role: id_role, surname, name, patronymic };
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}

module.exports = {
  login,
};
