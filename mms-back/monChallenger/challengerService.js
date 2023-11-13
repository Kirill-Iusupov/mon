const PdfPrinter = require("pdfmake");
const dayjs = require("dayjs");
const db = require("../utils/db");
const file = require("../utils/file");
const crypto = require("../utils/crypto");
const Config = require("../utils/config");
const DOC_PATH = Config.DOC_PATH;
const ALLOW_HOST = Config.ALLOW_HOST;

async function university(idChal) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_challenger_text($1);", [
      idChal,
    ]);
    return rows;
  } catch (err) {
    console.log("error challenger university", err.message);
    return false;
  }
}

async function dataFill(idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger_date($1);",
      [idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challengerProfile dataFill", err.message);
    return false;
  }
}

async function detail(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challengerPersonal detail", err.message);
    return false;
  }
}

async function updatePassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'UPDATE public.challenger SET "password"=$2 WHERE id_challenger=$1;',
      [idChal, password]
    );
    return rows;
  } catch (err) {
    console.log("error challenger updatePassword", err.message);
    return false;
  }
}
async function checkPassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'SELECT EXISTS(select 1 from  public.challenger WHERE id_challenger=$1 and "password"=$2);',
      [idChal, password]
    );
    if (rows.length > 0) {
      const { exists } = rows[0];
      return exists;
    }
    return false;
  } catch (err) {
    console.log("error challenger checkPassword", err.message);
    return false;
  }
}

async function photo(idChal, photoPath) {
  try {
    const resPhoto = await db.query('call "sp_challenger_foto"($1, $2)', [
      idChal,
      photoPath,
    ]);
    // const { rows, rowCount } = await db.query(
    //   `
    // WITH upsert AS(
    //     UPDATE  public.employee_photo SET employee_photo = $2
    //     WHERE id_employee = $1
    //     RETURNING *
    // )
    //     INSERT INTO public.employee_photo (id_employee, employee_photo)
    //     select $1, $2
    //     WHERE NOT EXISTS(SELECT * FROM upsert)
    //     RETURNING * `,
    //   [idChal, photoPath]
    // );
    // return rows || rowCount;

    return resPhoto.error ? false : true;
  } catch (err) {
    console.log("error challenger photo", err.message);
    return false;
  }
}

async function info(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger_info($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challenger info", err.message);
    return false;
  }
}

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

async function exportPdf(detail, info, university, doc, expireDate) {
  const table = [];

  if (detail) {
    table.push(
      [
        { text: "Ф.И.О.", alignment: "left", bold: true },
        {
          text: `${detail?.surname} ${detail?.name} ${detail?.patronymic}`,
          alignment: "left",
        },
      ],
      [
        { text: "Статус", alignment: "left", bold: true },
        {
          text: detail?.status,
          alignment: "left",
        },
      ],
      [
        { text: "ПИН", alignment: "left", bold: true },
        {
          text: detail?.pin,
          alignment: "left",
        },
      ],
      [
        { text: "Дата рождения", alignment: "left", bold: true },
        {
          text: dayjs(detail?.birth_day).format("DD.MM.YYYY"),
          alignment: "left",
        },
      ],
      [
        { text: "Пол", alignment: "left", bold: true },
        {
          text: detail?.gender,
          alignment: "left",
        },
      ],
      [
        { text: "Номер паспорта", alignment: "left", bold: true },
        {
          text: detail?.passport,
          alignment: "left",
        },
      ],
      [
        { text: "Дата выдачи", alignment: "left", bold: true },
        {
          text: dayjs(detail?.passport_day).format("DD.MM.YYYY"),
          alignment: "left",
        },
      ],
      [
        { text: "Телефон", alignment: "left", bold: true },
        {
          text: detail?.telephone,
          alignment: "left",
        },
      ],
      [
        { text: "email", alignment: "left", bold: true },
        {
          text: detail?.email,
          alignment: "left",
        },
      ]
    );
  }
  if (info) {
    table.push(
      [
        { text: "Адрес", alignment: "left", bold: true },
        {
          text: `${info?.region}, ${info?.district_city}, ${info?.address}`,
          alignment: "left",
        },
      ],
      [
        {
          text: "Претендуемый уровень образования",
          alignment: "left",
          bold: true,
        },
        {
          text: info?.education_level,
          alignment: "left",
        },
      ],
      [
        { text: "Обучаемое направление", alignment: "left", bold: true },
        {
          text: info?.lan_direction,
          alignment: "left",
        },
      ],
      [
        {
          text: "Кыргызский язык/уровень владения",
          alignment: "left",
          bold: true,
        },
        {
          text: info?.kyrgyz,
          alignment: "left",
        },
      ],
      [
        {
          text: "Русский язык/уровень владения",
          alignment: "left",
          bold: true,
        },
        {
          text: info?.russian,
          alignment: "left",
        },
      ],
      [
        {
          text: "Английский язык/уровень владения",
          alignment: "left",
          bold: true,
        },
        {
          text: info?.english,
          alignment: "left",
        },
      ],
      [
        {
          text: "Другой язык/уровень владения",
          alignment: "left",
          bold: true,
        },
        {
          text: info?.other,
          alignment: "left",
        },
      ]
    );
  }
  if (university) {
    table.push(
      [
        {
          text: "Полное название высшего учебного заведения",
          alignment: "left",
          bold: true,
        },
        {
          text: university.university,
          alignment: "left",
        },
      ],
      [
        {
          text: "Образовательная программа (специальность)",
          alignment: "left",
          bold: true,
        },
        {
          text: university?.speciality,
          alignment: "left",
        },
      ],
      [
        {
          text: "Мотивационное эссе на кыргызском или русском или английском языках (250-500 слов)",
          alignment: "left",
          bold: true,
        },
        {
          text: university?.essay,
          alignment: "left",
        },
      ],
      [
        { text: "Дополнительная информация", alignment: "left", bold: true },
        {
          text: university?.additional,
          alignment: "left",
        },
      ]
    );
  }
  if (doc) {
    doc.forEach((d) => {
      table.push([
        {
          text: d.document,
          alignment: "left",
          bold: true,
        },
        {
          text: d.document_url ? String(d.document_url).split("_")[2] : "",
          alignment: "left",
          link: d.document_url
            ? `${ALLOW_HOST}/elumutu/api/doc/pdf/${d.document_url}?q=frompdf&u=${expireDate}`
            : "",
        },
      ]);
    });
  }

  var fonts = {
    Roboto: {
      normal: "./public/fonts/Roboto/Roboto-Regular.ttf",
      bold: "./public/fonts/Roboto/Roboto-Medium.ttf",
      italics: "./public/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics: "./public/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
  };

  var printer = new PdfPrinter(fonts);
  var docDefinition = {
    content: [
      {
        text: "Претендент",
        style: "header",
        alignment: "center",
        bold: true,
      },

      {
        style: "table",
        table: {
          widths: ["40%", "60%"],
          body: table?.map((trow) => {
            return trow;
          }),
        },
      },
    ],
    footer: function (currentPage, pageCount) {
      let t = {
        layout: "noBorders",
        fontSize: 8,
        margin: [25, 0, 25, 0],
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              { text: dayjs().format("DD.MM.YYYY"), alignment: "left" },
              {
                text: currentPage.toString() + "/" + pageCount,
                alignment: "right",
              },
            ],
          ],
        },
      };

      return t;
    },
    pageOrientation: "portrait",
    pageMargins: [27, 27, 27, 27],
    styles: {
      header: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: "center",
      },
      table: {
        fontSize: 11,
        // bold: true,
        alignment: "center",
        margin: [0, 10, 0, 10],
      },
    },
    defaultStyle: {
      font: "Roboto",
      columnGap: 20,
    },
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise((resolve, reject) => {
    try {
      var chunks = [];
      pdfDoc.on("data", (chunk) => chunks.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function exportPdfFileExpire() {
  const today = new Date();
  const dateLimit = new Date(new Date().setDate(today.getDate() + 90));
  const enc = crypto.encrypt(dateLimit.toJSON());
  return encodeURIComponent(enc);
}

module.exports = {
  doc,
  iudDocFile,
  dataFill,
  detail,
  photo,
  updatePassword,
  checkPassword,
  info,
  university,
  exportPdf,
  exportPdfFileExpire,
};
