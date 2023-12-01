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
app.use("/mms", express.static("public"));

//**********************************************************
if (Config.FAKE_AUTH_MODE === "true") {
  console.log("FAKE_AUTH_MODE = true");
}
//**********************************************************

///////////////////////////
app.use("/mms/api/user", require("./user"));
app.use("/mms/api/personal", require("./personal"));
app.use("/mms/api/schedule", require("./schedule"));
app.use("/mms/api/structure", require("./structure"));
app.use("/mms/api/business", require("./business"));
app.use("/mms/api/report", require("./report"));
// app.use("/mms/api/challenger", require("./challenger"));
// app.use("/mms/api/doc", require("./challengerDoc"));
// app.use("/mms/api/info", require("./challengerInfo"));
// app.use("/mms/api/personal", require("./challengerPersonal"));
// app.use("/mms/api/university", require("./challengerUniversity"));
// app.use("/mms/api/mon", require("./monList"));
// app.use("/mms/api/chal", require("./monChallenger"));
app.use("/mms/api/shared", require("./shared"));

app.use("/", (_req, res, _next) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

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
