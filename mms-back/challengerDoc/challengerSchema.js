const docSaveSchema = {
  type: "object",
  properties: {
    idDoc: { type: "string", required: true },
    docName: { type: "string", required: true },
  },
};

module.exports = {
  docSaveSchema,
};
