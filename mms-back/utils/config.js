require("dotenv").config();

const APP_URL = process.env.APP_URL || "elumutu";
const AVATAR_PATH = process.env.AVATAR_PATH || "C:\\";
const DOC_PATH = process.env.DOC_PATH || "C:\\";
const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  "5c543f356c79a4717708dfdde1a872c9bc6a4369d2b419bc0a8c234ea9795df71727a375bea260aede25f87fa5d504c029eb7f9513f2792eea169cc5cf2d0db2";
const JWT_EXPIRE_HOURS = process.env.JWT_EXPIRE_HOURS || "30h";

console.log({ JWT_ACCESS_SECRET });
const COOKIE_NAME = process.env.COOKIE_NAME || "tokenElUmutu";
const COOKIE_PATH = process.env.COOKIE_PATH || "/elumutu/api";
const MAX_AGE = process.env.MAX_AGE || "6000000";

const ALLOW_HOST = process.env.ALLOW_HOST || "http://mon.sc.on.kg";
const ALLOW_HOST_LIST = ["http://localhost:3000", ALLOW_HOST];

const DBUSER = process.env.DBUSER || "DBUSER";
const DBPASS = process.env.DBPASS || "DBPASS";
const DBSERVER = process.env.DBSERVER || "localhost";
const DBPORT = process.env.DBPORT || "1433";
const DBNAME = process.env.DBNAME || "AVN";
const DBPG_MAX_CONNECTIONS = process.env.DBPG_MAX_CONNECTIONS || 20;
const DBPG_IDLETIMEOUTMILLLIS = process.env.DBPG_IDLETIMEOUTMILLLIS || 30000;
const DBPG_CONNECTIONTIMEOUTMILLES =
  process.env.DBPG_CONNECTIONTIMEOUTMILLES || 2000;

const NODE_ENV = process.env.NODE_ENV || "production";
const DEBUG_MODE = process.env.DEBUG_MODE || "false";
const FAKE_AUTH_MODE = process.env.FAKE_AUTH_MODE || "false";
const FAKE_IS_STAFF = process.env.FAKE_IS_STAFF || "false";
const FAKE_ID = process.env.FAKE_ID || 11;
const PORT = process.env.PORT || "3000";
const CHECK_TUNDUK = process.env.CHECK_TUNDUK || "false";
const REGISTER_ALLOW = process.env.REGISTER_ALLOW || "false";

module.exports = {
  REGISTER_ALLOW,
  JWT_ACCESS_SECRET,
  JWT_EXPIRE_HOURS,
  COOKIE_PATH,
  MAX_AGE,
  ALLOW_HOST,
  ALLOW_HOST_LIST,
  COOKIE_NAME,
  DBUSER,
  DBPASS,
  DBSERVER,
  DBNAME,
  DBPORT,
  DBPG_MAX_CONNECTIONS,
  DBPG_IDLETIMEOUTMILLLIS,
  DBPG_CONNECTIONTIMEOUTMILLES,
  PORT,
  NODE_ENV,
  DEBUG_MODE,
  FAKE_AUTH_MODE,
  FAKE_IS_STAFF,
  FAKE_ID,
  APP_URL,
  AVATAR_PATH,
  DOC_PATH,
  CHECK_TUNDUK,
};
