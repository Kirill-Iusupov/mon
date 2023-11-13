/* eslint-disable no-unused-vars */
const send = require("../utils/send");
const validate = require("../utils/validator");
const COOKIE = require("../utils/cookie");
const Utils = require("../utils/utils");
const { logDB } = require("../services/LogService");
const TokenService = require("../utils/jwt");
const UserSchema = require("./userSchema");
const UserService = require("./userService");
const Config = require("../utils/config");
class UserController {
  async login(req, res) {
    // const is_staff = req.params.is_staff === "staff" ? true : false;

    const isValid = validate(
      req.body,
      UserSchema.userSchema
      // is_staff ? UserSchema.userAdminSchema : UserSchema.userChallengerSchema
    );
    const { login, password } = req.body;
    // const is_staff = req.params.is_staff === "staff" ? true : false;
    // const pattern = /^[0-9]*$/;
    // const pattern = /^[a-zA-Z0-9]*$/;
    // const matchStatus = pattern.test(login);
    const is_staff = Utils.isNumeric(login) ? false : true;
    
    const loginLen = String(login).length;
    const matchStatus = is_staff ? loginLen >= 4 : loginLen === 14;
    if (!isValid || !matchStatus) {
      logDB(
        "inValidFormat",
        "EXCEPTION",
        "login",
        JSON.stringify({ ...req.body, isValid, matchStatus, is_staff }),
        0,
        is_staff
      );
      return send(res, false, req.t("inValidFormat"), true, 400);
    }
    const id = await UserService.login(String(login), password, is_staff);
    if (id) {
      const user = await UserService.userName(id, is_staff);
      const role = await UserService.userRole(id, is_staff);
      const exp =
        Date.now() + parseInt(Config.JWT_EXPIRE_HOURS) * 60 * 60 * 1000;
      const token = TokenService.generateAccessToken({
        id: id,
        type: role,
        s: user.surname,
        n: user.name,
        p: user.patronymic,
        exp,
      });
      if (!token) return send(res, false, "tokenGenerateError", true, 400);
      const tokenBearer = "Bearer " + token;
      const logged = await COOKIE.LOGIN(
        req,
        res,
        is_staff,
        login,
        id,
        tokenBearer
      );

      res.cookie(Config.COOKIE_NAME, tokenBearer, {
        // maxAge: Config.MAX_AGE,
        expiresIn: exp,
        httpOnly: true,
        Path: Config.COOKIE_PATH,
        SameSite: "None",
      });

      if (logged && user) {
        // return send(res, { id, is_staff, token: logged }, req.t('success'), false, 200);
        return send(
          res,
          {
            authState: {
              type: role,
              s: user.surname,
              n: user.name,
              p: user.patronymic,
              exp,
            },
            token: "token",
            tokenType: "cookie",
            // tokenType: "Bearer",
            // expiresIn: parseInt(10) * 60, // minutes
            expiresIn: parseInt(Config.JWT_EXPIRE_HOURS) * 60, // minutes
          },
          "success",
          false,
          200
        );
      }
    }
    return send(res, false, req.t("unauth"), true, 401);
  }

  async check(req, res) {
    const token = req.cookies[Config.COOKIE_NAME];
    if (!token) {
      res.cookie(Config.COOKIE_NAME, "tokenWillBeDeleted", {
        maxAge: 0,
        httpOnly: true,
        Path: Config.COOKIE_PATH,
        SameSite: "None",
      });
      return send(res, false, "noCookie", true, 401);
    }
    const userData = TokenService.getTokenData(token);
    const is_staff = userData.type === 1 ? false : true;

    const dbAuthCheck = await COOKIE.CHECK_PERM(req, is_staff);

    // console.log({ userData })
    if (userData && userData.exp > new Date() && dbAuthCheck)
      return send(
        res,
        {
          authState: {
            // id: userData.id,
            type: userData.type,
            // id_avn: userData.id_avn,
            s: userData.s,
            n: userData.n,
            p: userData.p,
            exp: userData.exp,
          },
          token: "token",
          tokenType: "cookie",
          expiresIn: parseInt((userData.exp - Date.now()) / 60000), //minutes
        },
        "success",
        false,
        200
      );
    res.cookie(Config.COOKIE_NAME, "tokenWillBeDeleted", {
      maxAge: 0,
      httpOnly: true,
      Path: Config.COOKIE_PATH,
      SameSite: "None",
    });
    return send(res, false, "error", true, 401);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const user = await UserService.getUser(cookie);
    // if (user) {
    //   return send(
    //     res,
    //     { id: user.id, is_staff: user.staff, token: cookie },
    //     req.t("success"),
    //     false,
    //     200
    //   );
    // }
    // return send(res, false, req.t("unauth"), true, 401);
  }

  async logout(req, res) {
    await COOKIE.LOGOUT(req, res);
    res.cookie(Config.COOKIE_NAME, "tokenWillBeDeleted", {
      maxAge: 0,
      httpOnly: true,
      Path: Config.COOKIE_PATH,
      SameSite: "None",
    });
    return send(res, true, req.t("success"), false, 200);
  }
}

module.exports = new UserController();
