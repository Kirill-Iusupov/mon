const PdfPrinter = require("pdfmake");
const dayjs = require("dayjs");
const db = require("../utils/db");

async function status(lang, role) {
  try {
    const query =
      role === 2
        ? 'SELECT * FROM "fn_status"($1) WHERE "id_status" in(2, 3)'
        : 'SELECT * FROM "fn_status"($1) WHERE "id_status" in(4, 5)';
    const { rows } = await db.query(query, [lang]);

    return rows;
  } catch (err) {
    console.log("error mon status", err.message);
    return false;
  }
}

async function mon(lang) {
  try {
    const { rowCount, rows } = await db.query(
      'SELECT * FROM "fn_challenger_mon"($1)',
      [lang]
    );

    return rows;
  } catch (err) {
    console.log("error mon list", err.message);
    return false;
  }
}
async function monFilter(lang, statusList) {
  try {
    const { rowCount, rows } = await db.query(
      `SELECT * FROM "fn_challenger_mon"($1) where id_status in (${statusList.join(
        ","
      )})`,
      [lang]
    );

    return rows;
  } catch (err) {
    console.log("error mon list", err.message);
    return false;
  }
}
async function updateStatus(idChal, status) {
  try {
    const resUpdateStatus = await db.query(
      "call sp_challenger_status($1,$2);",
      [idChal, status]
    );
    return resUpdateStatus.error ? false : true;
  } catch (err) {
    console.log("error mon updateStatus", err.message);
    return false;
  }
}
async function insertStatusHistory(idChal, status, idUser) {
  try {
    const { rowCount } = await db.query(
      "INSERT INTO public.status_history (id_user, id_status, id_chal) VALUES( $1, $2, $3);",
      [idUser, status, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error mon insertStatusHistory", err.message);
    return false;
  }
}

async function exportListPdf(data) {
  const TABLE = [
    [
      { text: "№", style: "header" },
      { text: "Ф.И.О.", style: "header", alignment: "left" },
      {
        text: "Возраст",
        style: "header",
      },
      { text: "Уровень", style: "header" },
      { text: "Направление", style: "header" },
      { text: "Статус", style: "header" },
      { text: "Данные", style: "header" },
      { text: "Документы", style: "header" },
      { text: "Университет", style: "header" },
    ],
  ];

  TABLE.push(...data);

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
        text: "Список претендентов",
        style: "header",
        alignment: "center",
        bold: true,
      },

      {
        style: "table",
        table: {
          widths: ["5%", "25%", "5%", "12%", "15%", "10%", "5%", "5%", "18%"],
          body: TABLE?.map((trow) => {
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
    pageOrientation: "landscape",
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

module.exports = {
  status,
  mon,
  exportListPdf,
  updateStatus,
  insertStatusHistory,
  monFilter,
};
