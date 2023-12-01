const COOKIE = require("../utils/cookie");
const send = require("../utils/send");
const Config = require("../utils//config");
const JWT = require("../utils/jwt");

const returnMessage = (resp, message) => send(resp, false, message, true, 401);

async function is_challenger(req, res, next) {
  return await check(req, res, next);
}

async function is_staff(req, res, next) {
  return await check(req, res, next);
}
async function is_staff_or_challenger(req, res, next) {
  return await check(req, res, next);
}

async function check(req, res, next) {
  if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
    // development FAKE_ID
    next();
  } else {
    const IsAuthenticated = await COOKIE.CHECK_PERM(req);
    if (IsAuthenticated) {
      next();
    } else {
      return send(res, false, req.t("token.noAuth"), true, 401);
    }
  }
}

const isChallengerToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [1]);
};
const isMonToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [2]);
};
const isAparatToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [3]);
};
const isExpertToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [4]);
};
const isMonOrAparatToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [2,3]);
};
const isStaffToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [2, 3, 4]);
};

const checkToken = async (req, resp, next, roles) => {
  try {
    if (Config.NODE_ENV === "development" && Config.FAKE_AUTH_MODE === "true") {
      next();
    }

    // const token = req.headers["authorization"];
    const token = req.cookies[Config.COOKIE_NAME];
    // console.log("token", token);
    req.token = token;

    if (!!token) {
      const decodedData = JWT.getTokenData(token);
      if (Config.NODE_ENV === "development") {
        console.log({ decodedData });
        console.log(new Date(decodedData.exp));
        console.log(new Date());
        console.log(decodedData.exp > new Date());
      }
      if (token && decodedData && decodedData.exp > new Date()) {
        if (roles.includes(decodedData.type)) {
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

const getTokenData = async (req) => {
  try {
    // const token = req.headers["authorization"];
    const token = req.cookies[Config.COOKIE_NAME];

    if (!!token) {
      const decodedData = JWT.getTokenData(token);
      if (token && decodedData && decodedData.exp > new Date()) {
        return decodedData;
      }
    }

    return false;
  } catch (err) {
    console.log("getTokenData error catch =>", err);
    return false;
  }
};
module.exports = {
  is_staff,
  is_challenger,
  is_staff_or_challenger,
  isChallengerToken,
  isMonToken,
  isAparatToken,
  isStaffToken,
  getTokenData,
  isExpertToken,
  isMonOrAparatToken
};
