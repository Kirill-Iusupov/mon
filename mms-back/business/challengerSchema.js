const infoSaveSchema = {
  type: "object",
  properties: {
    district: { type: "number", required: true },
    address: { type: "string", required: true },
    education: { type: "number", required: true },
    direction: { type: "number", required: true },
    kg: { type: "number", required: true },
    ru: { type: "number", required: true },
    en: { type: "number", required: true },
    other: { type: "number", required: true },
  },
};

module.exports = {
  infoSaveSchema,
};
