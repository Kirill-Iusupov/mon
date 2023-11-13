const express = require("express");
// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");
const compression = require("compression");
const fileUpload = require("express-fileupload");

const cookieParser = require("cookie-parser");
var cors = require("cors");
const { corsOptionsDelegate } = require("./utils/cors");
const translator = require("./utils/i18n");
const Config = require("./utils/config");
const { frontendRoutes } = require("./utils/frontendRoutes");
const app = express();

// Sentry.init({
//   dsn: "https://f12b86b806d943988c74d2ac718a3bc5@o188902.ingest.sentry.io/4504683224367104",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 0.01,
// });

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

//compression settings*********************************************
app.use(compression());
//CORS settings*********************************************
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(translator);
// app.use("/public", express.static("public"));
app.use("/", express.static("public"));
// app.use("/elumutu", express.static("public"));

//**********************************************************
if (Config.FAKE_AUTH_MODE === "true") {
  console.log("FAKE_AUTH_MODE = true");
}
//**********************************************************

///////////////////////////
app.use("/elumutu/api/user", require("./user"));
app.use("/elumutu/api/register", require("./register"));
// app.use("/elumutu/api/challenger", require("./challenger"));
app.use("/elumutu/api/doc", require("./challengerDoc"));
app.use("/elumutu/api/info", require("./challengerInfo"));
app.use("/elumutu/api/personal", require("./challengerPersonal"));
app.use("/elumutu/api/university", require("./challengerUniversity"));
app.use("/elumutu/api/mon", require("./monList"));
app.use("/elumutu/api/chal", require("./monChallenger"));
app.use("/elumutu/api/shared", require("./shared"));

app.use("/elumutu/:frontpage", (req, res, next) => {
  const { frontpage } = req.params;
  if (frontendRoutes.some((v) => frontpage === v)) {
    // Will only return when the `str` is included in the `substrings`
    return res.sendFile(`${__dirname}/public/elumutu/index.html`);
  }
  next();
});
app.use("/elumutu/challenger/:id", (req, res, next) => {
  const { id } = req.params;
  if (parseInt(id) > 0) {
    return res.sendFile(`${__dirname}/public/elumutu/index.html`);
  }
  next();
});
// app.use("/", (_req, res, _next) => {
//   res.sendFile(`${__dirname}/public/index.html`);
// });

// app.use(Sentry.Handlers.errorHandler());

app.use((error, req, res, next) => {
  console.log("errorHandler", "=>", {
    url: req.url,
    error,
  });
  return res
    .status(400)
    .json({ error: true, data: false, message: error.message });
});
//////////////////////////
const port = Config.PORT || 4000;
app.listen(port, () => {
  console.log("Application listening on port ", port);
});
