const db = require("../utils/db");

async function dateEnd() {
  try {
    const { rowCount, rows } = await db.query("SELECT * FROM fn_tour()", []);
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error dateEnd", err.message);
    return false;
  }
}

async function region(lang) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_region"($1)', [lang]);
    return rows;
  } catch (err) {
    console.log("error region", err.message);
    return false;
  }
}

async function district(lang, idRegion) {
  try {
    const { rows } = await db.query(
      'SELECT * FROM "fn_district_city"($1, $2)',
      [lang, idRegion]
    );
    return rows;
  } catch (err) {
    console.log("error region", err.message);
    return false;
  }
}

async function education(lang) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_education_level"($1)', [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error education", err.message);
    return false;
  }
}

async function direction(lang, idEducation) {
  try {
    const { rows } = await db.query(
      'SELECT * FROM "fn_education_level_direction"($1, $2)',
      [lang, idEducation]
    );
    return rows;
  } catch (err) {
    console.log("error direction", err.message);
    return false;
  }
}

async function status(lang) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_status"($1)', [lang]);
    return rows;
  } catch (err) {
    console.log("error direction", err.message);
    return false;
  }
}

module.exports = {
  dateEnd,
  status,
  region,
  district,
  education,
  direction,
};
