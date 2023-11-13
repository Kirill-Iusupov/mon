const { Pool } = require("pg");
const SentryInstance = require("./sentry");
const Config = require("./config");

const pool = new Pool({
  host: Config.DBSERVER,
  port: Config.DBPORT,
  database: Config.DBNAME,
  user: Config.DBUSER,
  password: Config.DBPASS,
  max: parseInt(Config.DBPG_MAX_CONNECTIONS),
  idleTimeoutMillis: parseInt(Config.DBPG_IDLETIMEOUTMILLLIS),
  connectionTimeoutMillis: parseInt(Config.DBPG_CONNECTIONTIMEOUTMILLES),
});

async function connectionCheck() {
  try {
    return pool
      .query("select 1 as answer", [])
      .then((res) => {
        console.log(
          "Connected to PG=>",
          res.rows[0] && res.rows[0].answer == 1
        );
      }) // brianc
      .catch((err) => {
        console.error("Error executing query", err.stack);
        if (process.env.NODE_ENV === "production") {
          SentryInstance.Sentry.captureException(err);
        }
        throw new Error(err);
      });
  } catch (err) {
    // console.log("PG ERROR=>", err);
    return { rows: [], rowCount: 0, error: err.message };
  }
}
connectionCheck();

async function query(text, params) {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("PG query", { text, params });
    }
    const res = await pool.query(text, params);
    return { rows: res.rows, rowCount: res.rowCount, error: false };
  } catch (err) {
    console.log("PG ERROR=>", err);
    console.log("PG query", { text, params });
    SentryInstance.Sentry.captureException(err);
    return { rows: [], rowCount: 0, error: err.message };
  }
}

module.exports = {
  query: (text, params) => query(text, params),
  callback: (text, params, callback) => pool.query(text, params, callback),
};
