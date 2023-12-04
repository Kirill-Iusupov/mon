// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const Utils = require("../utils/utils");
const PersonalSchema = require("./personalSchema");
const PersonalService = require("./personalService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class PersonalController {
  async list(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const data = await PersonalService.list(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async empInsert(req, res) {
    const isValid = validate(req.body, PersonalSchema.empInsertSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { name, surname, patronymic, birthDate, pin, password } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const cryptoPass = Utils.md5(password);

    const data = await PersonalService.empInsert(
      name,
      surname,
      patronymic,
      birthDate,
      pin,
      cryptoPass
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async empUpdate(req, res) {
    const isValid = validate(req.body, PersonalSchema.empUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id, name, surname, patronymic, birthDate, pin } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);

    const data = await PersonalService.empUpdate(
      id,
      name,
      surname,
      patronymic,
      birthDate,
      pin
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async empDelete(req, res) {
    const isValid = validate(req.body, PersonalSchema.empDeleteSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);

    const data = await PersonalService.empDelete(id);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async empPassword(req, res) {
    const isValid = validate(req.body, PersonalSchema.empPasswordUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id, password } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const cryptoPass = Utils.md5(password);
    const data = await PersonalService.empPassword(id, cryptoPass);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new PersonalController();
