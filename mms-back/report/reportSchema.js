const reportInsertSchema = {
  type: "object",
  properties: {
    businessId: { type: "number", required: true },
    businessReport: { type: "string", required: true },
  },
};

const reportUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    businessId: { type: "number", required: true },
    businessReport: { type: "string", required: true },
  },
};
const reportDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};

module.exports = {
  reportInsertSchema,
  reportUpdateSchema,
  reportDeleteSchema,
};
