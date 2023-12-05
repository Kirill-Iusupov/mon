const db = require("../utils/db");
const file = require("../utils/file");
const crypto = require("../utils/crypto");
const Config = require("../utils/config");

const DOC_PATH = Config.DOC_PATH;

async function doc(lang, idChal) {
  try {
    const { rows } = await db.query(
      "select * from public.fn_challenger_document($1, $2);",
      [lang, idChal]
    );
    return rows;
  } catch (err) {
    console.log("error challenger doc", err.message);
    return false;
  }
}

async function docSave(idChal, idDoc, docUrl) {
  try {
    const resDoc = await db.query("call sp_challenger_document($1, $2, $3);", [
      idChal,
      idDoc,
      docUrl,
    ]);
    return resDoc.error ? false : true;
  } catch (err) {
    console.log("error challenger save", err.message);
    return false;
  }
}

async function iudDocFile(idDoc, idChal, iud, name, content) {
  try {
    const path = `${DOC_PATH}${idDoc}_${idChal}_${name}`;
    if (iud === 0) {
      await file.write(path, content);
    }
    if (iud === 1) {
      await file.write(path, content);
    }
    if (iud === 2) {
      await file.deleteFile(path);
    }

    return true;
  } catch (err) {
    console.log("error iudDocFile", err.message);
    return false;
  }
}

async function exportPdfFileExpireValidate(text) {
  try {
    const dec = crypto.decrypt(decodeURIComponent(text));
    const dateLimit = new Date(dec);
    const today = new Date();
    return dateLimit > today;
  } catch (e) {
    console.log("exportPdfFileExpireValidate => ", e.message);
    return false;
  }
}

module.exports = {
  doc,
  docSave,
  iudDocFile,
  exportPdfFileExpireValidate,
};
