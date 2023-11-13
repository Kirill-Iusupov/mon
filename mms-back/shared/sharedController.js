/* eslint-disable no-unused-vars */
const send = require("../utils/send");
const validate = require("../utils/validator");
const SharedSchema = require("./sharedSchema");
const SharedService = require("./sharedService");
const LangService = require("../services/LangService");

class SharedController {
  async dateEnd(req, res) {
    const data = await SharedService.dateEnd();
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async region(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.region(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async district(req, res) {
    const isValid = validate(req.query, SharedSchema.districtSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const { region } = req.query;
    const data = await SharedService.district(langId, parseInt(region));
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async education(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.education(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async direction(req, res) {
    const isValid = validate(req.query, SharedSchema.directionSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const { education } = req.query;
    const data = await SharedService.direction(langId, parseInt(education));
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async status(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.status(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new SharedController();
