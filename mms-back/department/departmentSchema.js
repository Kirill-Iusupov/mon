const departmentInsertSchema = {
  type: "object",
  properties: {
    departmentRu: { type: "string", required: true },
    departmentKg: { type: "string", required: true },
  },
};
const departmentUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    departmentRu: { type: "string", required: true },
    departmentKg: { type: "string", required: true },
  },
};
const departmentDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};

module.exports = {
  departmentInsertSchema,
  departmentUpdateSchema,
  departmentDeleteSchema,
};
