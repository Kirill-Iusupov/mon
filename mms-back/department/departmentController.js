// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const DepartmentSchema = require("./departmentSchema");
const DepartmentService = require("./departmentService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class DepartmentController {
  async list(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const data = await DepartmentService.list(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async departmentInsert(req, res) {
    const isValid = validate(req.body, DepartmentSchema.departmentInsertSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { departmentRu, departmentKg } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 0,
      id = 0;
    const data = await DepartmentService.departmentIUD(
      iud,
      id,
      departmentRu,
      departmentKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async departmentUpdate(req, res) {
    const isValid = validate(req.body, DepartmentSchema.departmentUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id, departmentRu, departmentKg } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 0;
    const data = await DepartmentService.departmentIUD(
      iud,
      id,
      departmentRu,
      departmentKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async departmentDelete(req, res) {
    const isValid = validate(req.body, DepartmentSchema.departmentDeleteSchema);
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
    const iud = 0,
      departmentRu = "",
      departmentKg = "";
    const data = await DepartmentService.departmentIUD(
      iud,
      id,
      departmentRu,
      departmentKg
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new DepartmentController();
