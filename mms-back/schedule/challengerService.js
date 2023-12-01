const db = require("../utils/db");

async function info(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger_info($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challenger info", err.message);
    return false;
  }
}

async function infoSave(
  idChal,
  id_district_city,
  address,
  id_education_level,
  id_direction,
  kyrgyz,
  russian,
  english,
  other
) {
  try {
    // IN id_challenger, integer,
    // IN id_district_city, integer,
    // IN address, character varying,
    // IN id_education_level, integer,
    // IN id_direction, integer,
    // IN kyrgyz, numeric,
    // IN russian, numeric,
    // IN english, numeric,
    // IN other, numeric

    const resDoc = await db.query(
      "call sp_challenger_info_insUpd($1, $2, $3,$4,$5,$6,$7,$8,$9);",
      [
        idChal,
        id_district_city,
        address,
        id_education_level,
        id_direction,
        kyrgyz,
        russian,
        english,
        other,
      ]
    );
    return resDoc.error ? false : true;
  } catch (err) {
    console.log("error challenger infoSave", err.message);
    return false;
  }
}

module.exports = {
  info,
  infoSave,
};
