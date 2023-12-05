const countryInsertSchema = {
  type: "object",
  properties: {
    countryRu: { type: "string", required: true },
    countryKg: { type: "string", required: true },
  },
};
const countryUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    countryRu: { type: "string", required: true },
    countryKg: { type: "string", required: true },
  },
};
const countryDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};

module.exports = {
  countryInsertSchema,
  countryUpdateSchema,
  countryDeleteSchema,
};
