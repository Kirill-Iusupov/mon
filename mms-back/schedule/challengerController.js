// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const ChallengerSchema = require("./challengerSchema");
const ChallengerService = require("./challengerService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class ChallengerController {
  async info(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.info(langId, isUser);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async infoSave(req, res) {
    const isValid = validate(req.body, ChallengerSchema.infoSaveSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { district, address, education, direction, kg, ru, en, other } =
      req.body;

    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);

    const data = await ChallengerService.infoSave(
      isUser,
      district,
      address,
      education,
      direction,
      kg,
      ru,
      en,
      other
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new ChallengerController();
