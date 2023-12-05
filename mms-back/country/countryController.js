// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const CountrySchema = require("./countrySchema");
const CountryService = require("./countryService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class CountryController {
  async list(req, res) {
    // const resolvedLanguage = req.i18n.resolvedLanguage;
    // const langId = await LangService.getLangId(resolvedLanguage);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const data = await CountryService.list();
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async countryInsert(req, res) {
    const isValid = validate(req.body, CountrySchema.countryInsertSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { countryRu, countryKg } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 0,
      id = 0;
    const data = await CountryService.countryIUD(
      iud,
      id,
      countryRu,
      countryKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async countryUpdate(req, res) {
    const isValid = validate(req.body, CountrySchema.countryUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id, countryRu, countryKg } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 1;
    const data = await CountryService.countryIUD(
      iud,
      id,
      countryRu,
      countryKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async countryDelete(req, res) {
    const isValid = validate(req.body, CountrySchema.countryDeleteSchema);
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
    const iud = 2,
      countryRu = "",
      countryKg = "";
    const data = await CountryService.countryIUD(
      iud,
      id,
      countryRu,
      countryKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new CountryController();
