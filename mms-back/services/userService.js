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

module.exports = {
  getUser,
};
