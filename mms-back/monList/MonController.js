// const mime = require('mime-types');
const send = require("../utils/send");
const validate = require("../utils/validator");

const Config = require("../utils/config");
const MonSchema = require("./MonSchema");
const MonService = require("./MonService");
const LangService = require("../services/LangService");
const CheckService = require("../services/CheckService");
const UserService = require("../services/UserService");

class MonController {
  async status(req, res) {
    const tokenData = await CheckService.getTokenData(req);

    if (!tokenData) {
      return send(res, false, req.t("error"), true, 400);
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await MonService.status(langId, tokenData.type);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async mon(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await MonService.mon(langId);
    if (data) {
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
  async export(req, res) {
    const { s } = req.query;
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    let statusList = [1, 2, 3, 4, 5];
    if (s) {
      const parsedStatus = JSON.parse(s);
      if (Array.isArray(parsedStatus)) {
        statusList = parsedStatus
          .filter((x) => x > 0 && x < 6)
          .map((y) => parseInt(y));
      }
    }
    const data = await MonService.monFilter(langId, statusList);

    const table = data.map((d, index) => {
      return [
        index + 1,
        { text: `${d.surname} ${d.name} ${d.patronymic}`, alignment: "left" },
        d.age,
        d.education_level,
        d.direction,
        d.status,
        d.info ? "Есть" : "",
        d.doc ? "Есть" : "",
        d.univ ? `${d.university} ${d.speciality}` : "",
      ];
    });
    const pdf = await MonService.exportListPdf(table);
    if (pdf) {
      return res.contentType("application/pdf").send(pdf);
      // return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }

  async updateStatus(req, res) {
    const isValid = validate(req.body, MonSchema.updateStatusSchema);
    if (!isValid) {
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
    const { id: idUser } = await UserService.getUser(cookie);
    if (idUser == 6) { // TODO expert role id=6
      return send(res, false, req.t("error"), true, 400);
    }
    const { id, status } = req.body;
    const data = await MonService.updateStatus(id, status);
    if (data) {
      MonService.insertStatusHistory(id, status, idUser);
      return send(res, data, req.t("success"), false, 200);
    }
    return send(res, false, req.t("error"), true, 400);
  }
}

module.exports = new MonController();
