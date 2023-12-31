const { ALLOW_HOST_LIST } = require("./config");

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (ALLOW_HOST_LIST.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
    //   exposedHeaders: ["Set-Cookie"],
    }; // reflect (enable) the requested origin in the CORS response
    // corsOptions = {origin: true, credentials: true}; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = { corsOptionsDelegate };
