const universitySaveSchema = {
  type: "object",
  properties: {
    // telephone: { type: "string" },
    // email: { type: "string" },
    // district: { type: "number", required: true },
    // address: { type: "string" },
    // education: { type: "number", required: true },
    // kyrgyz: { type: "number", required: true },
    // russian: { type: "number", required: true },
    // english: { type: "number", required: true },
    // other: { type: "number", required: true },
    university: { type: "string" },
    speciality: { type: "string" },
    essay: { type: "string" },
    additional: { type: "string" },
  },
};

module.exports = {
  universitySaveSchema,
};
