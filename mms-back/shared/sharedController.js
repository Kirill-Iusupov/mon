/* eslint-disable no-unused-vars */
const send = require("../utils/send");
const validate = require("../utils/validator");
const SharedSchema = require("./sharedSchema");
const SharedService = require("./sharedService");
const LangService = require("../services/LangService");

class SharedController {
  async role(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.role(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async department(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.department(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async employee(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.employee(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async post(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.post(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async businessType(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.businessType(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async businessTrip(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.businessTrip(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async country(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.country(langId);
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
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.district(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new SharedController();
