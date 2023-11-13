// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");
const Utils = require("../utils/utils");
const Image = require("../utils/image");
const UtilitySet = require("../utils/set");
const File = require("../utils/file");
const Config = require("../utils/config");
const ChallengerSchema = require("./challengerPersonalSchema");
const ChallengerService = require("./challengerPersonalService");
const LangService = require("../services/LangService");
const UserService = require("../services/UserService");
const AVATAR_PATH = Config.AVATAR_PATH;
const APP_URL = Config.APP_URL;

class ChallengerController {
  async update(req, res) {
    const isValid = validate(req.body, ChallengerSchema.updateSchema);
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
      idEmp,
      surname,
      names,
      patronymic,
      login,
      dateBirth,
      passport,
      passportDate,
      pin,
      idGender,
      idNation,
      idCitizen,
      idMartial,
      idEduc,
      telefon,
      address,
      email,
      isActive,
      idSpeciality,
      idStepen,
      surnameEn,
      namesEn,
      patronymicEn,
      role,
    } = req.body;

    if (!role || JSON.parse(role)?.length == 0) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.update(
      idEmp,
      surname,
      names,
      patronymic,
      login,
      dateBirth,
      passport,
      passportDate,
      pin,
      idGender,
      idNation,
      idCitizen,
      idMartial,
      idEduc,
      telefon,
      address,
      email,
      isUser,
      isActive,
      idSpeciality,
      idStepen,
      surnameEn,
      namesEn,
      patronymicEn
    );
    if (data) {
      const roleDb = await ChallengerService.roleList(1, idEmp);
      const dbSet = new Set(
        roleDb.filter((x) => x.this_employee === true).map((x) => x.id_role)
      );
      const roles = JSON.parse(role);
      const clientSet = new Set(roles);
      const toBeDeleteSet = UtilitySet.difference(dbSet, clientSet);
      const toBeInsertSet = UtilitySet.difference(clientSet, dbSet);
      const deletePromises = Array.from(toBeDeleteSet).map(async (idRole) => {
        // const deleted = idRole;
        const deleted = await ChallengerService.roleDelete(idEmp, idRole);
        return deleted && deleted.length && deleted[0];
      });
      const insertPromises = Array.from(toBeInsertSet).map(async (idRole) => {
        // const inserted = idRole;
        const inserted = await ChallengerService.roleInsert(idEmp, idRole);
        return inserted && inserted.length && inserted[0];
      });
      await Promise.all(deletePromises);
      await Promise.all(insertPromises);
      return send(res, { ...data[0] }, req.t("success"), false, 200);
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
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.detail(langId, isUser);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async detailSave(req, res) {
    const isValid = validate(req.body, ChallengerSchema.detailSaveSchema);
    if (!isValid) {
      return send(
        res,
        { status: "error", message: req.t("inValidFormat") },
        req.t("inValidFormat"),
        true,
        400
      );
    }
    const { telephone, email } = req.body;
    const cookie = req.cookies[Config.COOKIE_NAME];
    //const cookie = req.headers["authorization"];
    const { id: isUser } = await UserService.getUser(cookie);
    const data = await ChallengerService.detailSave(isUser, telephone, email);
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

  async photo(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return send(
          res,
          { status: "error", message: req.t("inValidFormat") },
          req.t("inValidFormat"),
          true,
          400
        );
      }
      const cookie = req.cookies[Config.COOKIE_NAME];
      //const cookie = req.headers["authorization"];
      const { id } = await UserService.getUser(cookie);
      const isValid = validate({ id }, ChallengerSchema.photoSchema);
      if (!isValid) {
        return send(
          res,
          { status: "error", message: req.t("inValidFormat") },
          req.t("inValidFormat"),
          true,
          400
        );
      }

      // let sampleFile;
      const sampleFile = req.files.file;
      const mimetype = sampleFile.mimetype;
      if (!mimetype.includes("image/")) {
        return send(
          res,
          { status: "error", message: req.t("inValidFormat") },
          req.t("inValidFormat"),
          true,
          400
        );
      }
      // const ext = mime.extension(mimetype);
      const ext = "jpeg";
      const fileName = Utils.md5(String(id) + Date.now());
      const normalUploadPath = `${AVATAR_PATH}lg-${fileName}.`;
      const minimizedUploadPath = `${AVATAR_PATH}sm-${fileName}.`;
      const dbUploadPath = `${fileName}.${ext}`;

      Image.normal(sampleFile.data, normalUploadPath, ext);
      Image.minimized(sampleFile.data, minimizedUploadPath, ext);
      const data = await ChallengerService.photo(id, dbUploadPath);
      if (data) {
        return send(res, data, req.t("success"), false, 200);
      }
      return send(res, false, req.t("error"), true, 400);
    } catch (error) {
      console.log("error Challenger photo");
      console.log({ error });
      return send(res, false, req.t("error"), true, 400);
    }
  }
  async photoShow(req, res) {
    const { fileName, size } = req.params; //ext
    const SIZE = size === "lg" ? "lg" : "sm";
    const logoPath = `${AVATAR_PATH}${SIZE}-${fileName}`;
    const exists = await File.exists(logoPath);
    if (!exists) return res.redirect(`/${APP_URL}/public/logo.svg`);
    return res.sendFile(logoPath);
  }
}

module.exports = new ChallengerController();
