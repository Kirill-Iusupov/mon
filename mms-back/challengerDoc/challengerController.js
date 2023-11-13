// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");
const File = require("../utils/file");
const Config = require("../utils/config");
const ChallengerSchema = require("./challengerSchema");
const ChallengerService = require("./challengerService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");
const Utils = require("../utils/utils");
const DOC_PATH = Config.DOC_PATH;

class ChallengerController {
  async doc(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.doc(langId, isUser);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async docSave(req, res) {
    const isValid = validate(req.body, ChallengerSchema.docSaveSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    const { idDoc, docName } = req.body;
    let sampleFile = req.files.file;
    const idDocFiltered = Number(idDoc);
    const docNameFiltered = Utils.onlyLetterNumberDot(
      Utils.transliterate(String(docName).slice(-20))
    );
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);

    const saveFile = await ChallengerService.iudDocFile(
      idDocFiltered,
      isUser,
      1,
      docNameFiltered,
      sampleFile.data
    );

    if (saveFile) {
      const docUrl = `${idDocFiltered}_${isUser}_${docNameFiltered}`;
      const data = await ChallengerService.docSave(
        isUser,
        idDocFiltered,
        docUrl
      );

      if (data) {
        return send(res, data, req.t("success"), false, 200);
      }
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
  async docShowPdf(req, res) {
    const { q, u } = req.query; //ext
    if (q !== "frompdf") {
      return res.redirect(`/assets/logo.svg`);
    }
    const isValidDate = await ChallengerService.exportPdfFileExpireValidate(
      String(u)
    );
    if (!isValidDate) {
      return res.redirect(`/assets/logo.svg`);
    }
    const { fileName } = req.params; //ext
    const fileNameFiltered = Utils.onlyLetterNumberDotUnderscore(fileName);
    const docPath = `${DOC_PATH}${fileNameFiltered}`;
    const exists = await File.exists(docPath);
    if (!exists) return res.redirect(`/assets/logo.svg`);

    return res.download(docPath, String(fileNameFiltered).split("_")[2]); //res.sendFile(docPath);
  }
}

module.exports = new ChallengerController();
