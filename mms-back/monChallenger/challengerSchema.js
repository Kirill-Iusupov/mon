const passwordSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    password: { type: "string", required: true },
  },
};
const photoSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
  },
};
const chalSchema = {
  type: "object",
  properties: {
    id: { type: "string", required: true },
  },
};

module.exports = {
  passwordSchema,
  photoSchema,
  chalSchema,
};
