// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");
const Config = require("../utils/config");
const Utils = require("../utils/utils");
const File = require("../utils/file");
const ChallengerSchema = require("./challengerSchema");
const ChallengerService = require("./challengerService");
const UserService = require("../services/UserService");
const LangService = require("../services/LangService");
const AVATAR_PATH = Config.AVATAR_PATH;
const APP_URL = Config.APP_URL;
const DOC_PATH = Config.DOC_PATH;

class ChallengerController {
  async university(req, res) {
    const isValid = validate(req.params, ChallengerSchema.chalSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const idChal = parseInt(req.params.id);
    const data = await ChallengerService.university(idChal);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async dataFill(req, res) {
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.dataFill(isUser);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async detail(req, res) {
    const isValid = validate(req.params, ChallengerSchema.chalSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const idChal = parseInt(req.params.id);
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await ChallengerService.detail(langId, idChal);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  // async password(req, res) {
  //   const isValid = validate(req.body, ChallengerSchema.passwordSchema);
  //   if (!isValid) {
  //     return send(
  //       res,
  //       { status: "error", message: req.t("inValidFormat") },
  //       req.t("inValidFormat"),
  //       true,
  //       400
  //     );
  //   }
  //   const { id, password } = req.body;
  //   const data = await ChallengerService.password(id, password);
  //   if (data) {
  //     return send(res, data, req.t("success"), false, 200);
  //   }
  //   return send(res, false, req.t("error"), true, 400);
  // }
  async photoShow(req, res) {
    const { fileName, size } = req.params; //ext
    const SIZE = size === "lg" ? "lg" : "sm";
    const logoPath = `${AVATAR_PATH}${SIZE}-${fileName}`;
    const exists = await File.exists(logoPath);
    if (!exists) return res.redirect(`/${APP_URL}/public/logo.svg`);
    return res.sendFile(logoPath);
  }
  async info(req, res) {
    const isValid = validate(req.params, ChallengerSchema.chalSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const idChal = parseInt(req.params.id);
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await ChallengerService.info(langId, idChal);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async doc(req, res) {
    const isValid = validate(req.params, ChallengerSchema.chalSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const idChal = parseInt(req.params.id);
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await ChallengerService.doc(langId, idChal);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async docShow(req, res) {
    const { fileName } = req.params; //ext
    const fileNameFiltered = Utils.onlyLetterNumberDotUnderscore(fileName);
    const docPath = `${DOC_PATH}${fileNameFiltered}`;
    const exists = await File.exists(docPath);
    if (!exists) return res.redirect(`/assets/logo.svg`);

    return res.download(docPath, String(fileNameFiltered).split("_")[2]); //res.sendFile(docPath);
  }
  async export(req, res) {
    const isValid = validate(req.params, ChallengerSchema.chalSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }

    const idChal = parseInt(req.params.id);
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const doc = await ChallengerService.doc(langId, idChal);
    const info = await ChallengerService.info(langId, idChal);
    const detail = await ChallengerService.detail(langId, idChal);
    const university = await ChallengerService.university(idChal);
    const expireDate = await ChallengerService.exportPdfFileExpire();


    const pdf = await ChallengerService.exportPdf(detail, info, university, doc, expireDate);
    if (pdf) {
      return res.contentType("application/pdf").send(pdf);
      // return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new ChallengerController();
