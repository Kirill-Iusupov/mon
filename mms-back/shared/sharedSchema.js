const districtSchema = {
  type: "object",
  properties: {
    region: { type: "string", required: true },
  },
};
const directionSchema = {
  type: "object",
  properties: {
    education: { type: "string", required: true },
  },
};

module.exports = {
  districtSchema,
  directionSchema,
};
