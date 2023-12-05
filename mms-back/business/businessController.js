// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const BusinessSchema = require("./businessSchema");
const BusinessService = require("./businessService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class BusinessController {
  async list(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const data = await BusinessService.list(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async businessInsert(req, res) {
    const isValid = validate(req.body, BusinessSchema.businessInsertSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const {
      businessRu,
      businessKg,
      businessTypeId,
      businessTripId,
      employeeId,
      countryId,
      regionId,
      begDate,
      endDate,
      departmentId,
      order,
      orderFile,
      comment,
    } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 0,
      id = 0;
    const data = await BusinessService.businessIUD(
      iud,
      id,
      businessRu,
      businessKg,
      businessTypeId,
      businessTripId,
      employeeId,
      countryId,
      regionId,
      begDate,
      endDate,
      departmentId,
      order,
      orderFile,
      comment
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async businessUpdate(req, res) {
    const isValid = validate(req.body, BusinessSchema.businessUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const {
      id,
      businessRu,
      businessKg,
      businessTypeId,
      businessTripId,
      employeeId,
      countryId,
      regionId,
      begDate,
      endDate,
      departmentId,
      order,
      orderFile,
      comment,
    } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 1;
    const data = await BusinessService.businessIUD(
      iud,
      id,
      businessRu,
      businessKg,
      businessTypeId,
      businessTripId,
      employeeId,
      countryId,
      regionId,
      begDate,
      endDate,
      departmentId,
      order,
      orderFile,
      comment
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async businessDelete(req, res) {
    const isValid = validate(req.body, BusinessSchema.businessDeleteSchema);
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
      businessRu = "",
      businessKg = "",
      businessTypeId = 0,
      businessTripId = 0,
      employeeId = 0,
      countryId = 0,
      regionId = 0,
      begDate = "2023-01-01",
      endDate = "2023-01-01",
      departmentId = 0,
      order = "",
      orderFile = "",
      comment = "";
    const data = await BusinessService.businessIUD(
      iud,
      id,
      businessRu,
      businessKg,
      businessTypeId,
      businessTripId,
      employeeId,
      countryId,
      regionId,
      begDate,
      endDate,
      departmentId,
      order,
      orderFile,
      comment
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new BusinessController();
