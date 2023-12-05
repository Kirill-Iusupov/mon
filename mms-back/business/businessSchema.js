const businessInsertSchema = {
  type: "object",
  properties: {
    businessRu: { type: "string", required: true },
    businessKg: { type: "string", required: true },
    businessTypeId: { type: "number", required: true },
    businessTripId: { type: "number", required: true },
    employeeId: { type: "number", required: true },
    countryId: { type: "number", required: true },
    regionId: { type: "number" },
    begDate: { type: "string", required: true },
    endDate: { type: "string", required: true },
    departmentId: { type: "number", required: true },
    order: { type: "string", required: true },
    orderFile: { type: "string", required: true },
    comment: { type: "string" },
  },
};
const businessUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    businessRu: { type: "string", required: true },
    businessKg: { type: "string", required: true },
    businessTypeId: { type: "number", required: true },
    businessTripId: { type: "number", required: true },
    employeeId: { type: "number", required: true },
    countryId: { type: "number", required: true },
    regionId: { type: "number" },
    begDate: { type: "string", required: true },
    endDate: { type: "string", required: true },
    departmentId: { type: "number", required: true },
    order: { type: "string", required: true },
    orderFile: { type: "string", required: true },
    comment: { type: "string" },
  },
};
const businessDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};

module.exports = {
  businessInsertSchema,
  businessUpdateSchema,
  businessDeleteSchema,
};
