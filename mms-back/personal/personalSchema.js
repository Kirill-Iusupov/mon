const empInsertSchema = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    surname: { type: "string", required: true },
    patronymic: { type: "string" },
    birthDate: { type: "string", required: true },
    pin: { type: "number", required: true },
    password: { type: "string", required: true },
  },
};
const empUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    name: { type: "string", required: true },
    surname: { type: "string", required: true },
    patronymic: { type: "string" },
    birthDate: { type: "string", required: true },
    pin: { type: "number", required: true },
  },
};
const empDeleteSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};
const empPasswordUpdateSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    password: { type: "string", required: true },
  },
};

module.exports = {
  empInsertSchema,
  empUpdateSchema,
  empDeleteSchema,
  empPasswordUpdateSchema,
};
