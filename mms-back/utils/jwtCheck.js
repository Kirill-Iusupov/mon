const Config = require("./config");
const {  getTokenData } = require("./jwt");


const returnMessage = (resp, message) =>
  resp.status(401).json({ message, error: true, data: false });

const isAuth = async (req, resp, next) => {
  try {
    if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
      next();
    }

    // const token = req.headers["authorization"];
    const token = req.cookies[Config.COOKIE_NAME];
    // console.log("token", token);
    req.token = token;

    if (!!token) {
      const decodedData = getTokenData(token);
      if (Config.NODE_ENV === "development") {
        console.log({ decodedData });
        console.log(new Date(decodedData.exp));
        console.log(new Date());
        console.log(decodedData.exp > new Date());
      }
      if (token && decodedData && decodedData.exp > new Date()) {
        req.user = decodedData;
        return next();
        // if (req.body.id == decodedData.data.id) return next();
        // return returnMessage(resp, "id not found");
      } else {
        return returnMessage(resp, "token invalid");
      }
    } else {
      // console.log("token not found", token);
      return returnMessage(resp, "token not found");
    }
  } catch (err) {
    console.log("CheckUser error catch =>", err);
    return returnMessage(resp, "token expired");
  }
};

const isTeacher = async (req, resp, next) => {
  try {
    const role = 1;

    if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
      next();
    }

    // const token = req.headers["authorization"];
    const token = req.cookies[Config.COOKIE_NAME];
    // console.log("token", token);
    req.token = token;

    if (!!token) {
      const decodedData = getTokenData(token);
      if (Config.NODE_ENV === "development") {
        console.log({ decodedData });
        console.log(new Date());
        console.log(decodedData.exp > new Date());
      }
      if (token && decodedData && decodedData.exp > new Date()) {
        if (role == decodedData.type) {
          req.user = decodedData;
          return next();
        }
        return returnMessage(resp, "Permission denied");
      } else {
        return returnMessage(resp, "token invalid");
      }
    } else {
      // console.log("token not found", token);
      return returnMessage(resp, "token not found");
    }
  } catch (err) {
    console.log("CheckUser error catch =>", err);
    return returnMessage(resp, "token expired");
  }
};
const isStudent = async (req, resp, next) => {
  try {
    const role = 2;
    if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
      next();
    }

    // const token = req.headers["authorization"];
    const token = req.cookies[Config.COOKIE_NAME];
    // console.log("token", token);
    req.token = token;

    if (!!token) {
      const decodedData = getTokenData(token);
      if (Config.NODE_ENV === "development") {
        console.log({ decodedData });
        console.log(new Date(decodedData.exp));
        console.log(new Date());
        console.log(decodedData.exp > new Date());
      }
      if (token && decodedData && decodedData.exp > new Date()) {
        if (role == decodedData.type) {
          req.user = decodedData;
          return next();
        }
        return returnMessage(resp, "Permission denied");
      } else {
        return returnMessage(resp, "token invalid");
      }
    } else {
      // console.log("token not found", token);
      return returnMessage(resp, "token not found");
    }
  } catch (err) {
    console.log("CheckUser error catch =>", err);
    return returnMessage(resp, "token expired");
  }
};
module.exports = { isAuth, isTeacher, isStudent };
