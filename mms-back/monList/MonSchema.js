const updateStatusSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    status: { type: "number", required: true },
  },
};

module.exports = { updateStatusSchema };
