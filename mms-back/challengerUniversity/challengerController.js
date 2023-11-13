// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");
const Config = require("../utils/config");
const ChallengerSchema = require("./challengerSchema");
const ChallengerService = require("./challengerService");
const UserService = require("../services/UserService");

class ChallengerController {
  async university(req, res) {
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.university(isUser);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async universitySave(req, res) {
    const isValid = validate(req.body, ChallengerSchema.universitySaveSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { university, speciality, essay, additional } = req.body;

    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);

    const data = await ChallengerService.universitySave(
      isUser,
      university,
      speciality,
      essay,
      additional
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new ChallengerController();
