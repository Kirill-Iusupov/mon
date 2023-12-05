// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const ScheduleSchema = require("./scheduleSchema");
const ScheduleService = require("./scheduleService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");

class ScheduleController {
  async list(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const data = await ScheduleService.list(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async scheduleInsert(req, res) {
    const isValid = validate(req.body, ScheduleSchema.scheduleInsertSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { departmentId, empId, postId } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 0,
      id = 0;
    const data = await ScheduleService.scheduleIUD(
      iud,
      id,
      departmentId,
      empId,
      postId
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async scheduleUpdate(req, res) {
    const isValid = validate(req.body, ScheduleSchema.scheduleUpdateSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const { id, departmentId, empId, postId } = req.body;

    // const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    // const { id: isUser } = await UserService.getUser(cookie);
    const iud = 1;
    const data = await ScheduleService.scheduleIUD(
      iud,
      id,
      departmentId,
      empId,
      postId
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
  async scheduleDelete(req, res) {
    const isValid = validate(req.body, ScheduleSchema.scheduleDeleteSchema);
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
      departmentId = 0,
      empId = 0,
      postId = 0;
    const data = await ScheduleService.scheduleIUD(
      iud,
      id,
      departmentId,
      empId,
      postId
    );
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }

    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new ScheduleController();
