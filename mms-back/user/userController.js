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
    const isValid = validate(req.body, UserSchema.userSchema);
    const { login, password } = req.body;

    if (!isValid) {
      return send(res, false, req.t("inValidFormat"), true, 400);
    }
    const user = await UserService.login(String(login), password);
    if (user) {
      const exp =
        Date.now() + parseInt(Config.JWT_EXPIRE_HOURS) * 60 * 60 * 1000;
      const token = TokenService.generateAccessToken({
        id: user.id,
        type: user.role,
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
        login,
        user.id,
        user.role,
        tokenBearer
      );

      res.cookie(Config.COOKIE_NAME, tokenBearer, {
        // maxAge: Config.MAX_AGE,
        expiresIn: exp,
        httpOnly: true,
        Path: Config.COOKIE_PATH,
        SameSite: "None",
      });

      if (user && logged) {
        // return send(res, { id, is_staff, token: logged }, req.t('success'), false, 200);
        return send(
          res,
          {
            authState: {
              type: user.role,
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

    // console.log({ userData })
    if (userData && userData.exp > new Date())
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
