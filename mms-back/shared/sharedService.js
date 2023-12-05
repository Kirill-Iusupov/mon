const db = require("../utils/db");

async function role(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_role_sel($1)", [lang]);
    return rows;
  } catch (err) {
    console.log("error role", err.message);
    return false;
  }
}
async function department(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_department_sel($1)", [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error department", err.message);
    return false;
  }
}
async function employee(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_employee_sel($1)", [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error employee", err.message);
    return false;
  }
}
async function post(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_post_sel($1)", [lang]);
    return rows;
  } catch (err) {
    console.log("error post", err.message);
    return false;
  }
}
async function businessType(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_business_type_sel($1)", [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error business_type", err.message);
    return false;
  }
}
async function businessTrip(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_business_trip_sel($1)", [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error business_trip", err.message);
    return false;
  }
}
async function country(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_country_sel($1)", [lang]);
    return rows;
  } catch (err) {
    console.log("error country", err.message);
    return false;
  }
}
async function region(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_region_sel($1)", [lang]);
    return rows;
  } catch (err) {
    console.log("error region", err.message);
    return false;
  }
}
async function district(lang) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_district_sel($1)", [
      lang,
    ]);
    return rows;
  } catch (err) {
    console.log("error district", err.message);
    return false;
  }
}

module.exports = {
  role,
  department,
  employee,
  post,
  businessType,
  businessTrip,
  country,
  region,
  district,
};
