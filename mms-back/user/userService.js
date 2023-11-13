const db = require("../utils/db");
const { md5 } = require("../utils/utils");
const Config = require("../utils//config");

async function getUser(cookies) {
  try {
    if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
      const FAKE_ID = parseInt(Config.FAKE_ID) || 12;
      const FAKE_STAFF = Config.FAKE_IS_STAFF === "true";
      return { id: FAKE_ID, staff: FAKE_STAFF };
    }
    const { rowCount, rows } = await db.query(
      'SELECT * FROM "fn_Session_Get_User"($1)',
      [md5(String(cookies))]
    );
    if (rowCount) return { ...rows[0] };

    return false;
  } catch (err) {
    console.log("error getUser", err.message);
    return false;
  }
}
async function login(login, password, is_staff) {
  try {
    const cryptoPass = md5(password);
    const { rows } = await db.query("select * from fn_auth($1, $2, $3);", [
      login,
      cryptoPass,
      is_staff,
    ]);
    if (rows.length > 0) {
      const { id } = rows[0];
      return id;
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}
async function userName(id, is_staff) {
  try {
    const chalQuery =
      "select name, surname, patronymic from challenger where id_challenger = $1 limit 1;";

    const staffQuery =
      "select name, surname, patronymic from public.user where id_user = $1 limit 1;";

    const { rows } = await db.query(is_staff ? staffQuery : chalQuery, [id]);
    if (rows.length > 0) {
      return rows[0];
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}
async function userRole(id, is_staff) {
  try {
    if (is_staff === false) {
      return 1;
    }

    const { rows } = await db.query(
      "select id_role as role from public.user where id_user = $1 limit 1;",
      [id]
    );
    if (rows.length > 0) {
      return rows[0].role;
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}

module.exports = {
  getUser,
  login,
  userName,
  userRole,
};
