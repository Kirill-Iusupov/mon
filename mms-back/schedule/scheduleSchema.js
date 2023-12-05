const scheduleInsertSchema = {
  type: "object",
  properties: {
    departmentId: { type: "number", required: true },
    employeeId: { type: "number", required: true },
    postId: { type: "number", required: true },
  },
};
const scheduleUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    departmentId: { type: "number", required: true },
    employeeId: { type: "number", required: true },
    postId: { type: "number", required: true },
  },
};
const scheduleDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};

module.exports = {
  scheduleInsertSchema,
  scheduleUpdateSchema,
  scheduleDeleteSchema,
};
