const db = require("../utils/db");

async function university(idChal) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_challenger_text($1);", [
      idChal,
    ]);
    return rows;
  } catch (err) {
    console.log("error challenger university", err.message);
    return false;
  }
}
async function universitySave(
  idChal,
  university,
  speciality,
  essay,
  additional
) {
  try {
    //  id_challenger, integer,
    //  telephone, character varying,
    //  email, character varying,
    //  id_district_city, integer,
    //  address, character varying,
    //  id_education_level, integer,
    //  kyrgyz, numeric,
    //  russian, numeric,
    //  english, numeric,
    //  other, numeric,
    //  university, text,
    //  speciality, text,
    //  essay, text,
    //  additional, text

    const resUniver = await db.query(
      "call sp_challenger_text_insUpd($1,$2,$3,$4,$5);",
      [idChal, university, speciality, essay, additional]
    );
    return resUniver.error ? false : true;
  } catch (err) {
    console.log("error challenger universitySave", err.message);
    return false;
  }
}

module.exports = {
  university,
  universitySave,
};
