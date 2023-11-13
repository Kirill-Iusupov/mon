const userChallengerSchema = {
  type: "object",
  properties: {
    login: { type: "number", required: true },
    password: { type: "string", required: true },
  },
};
const userAdminSchema = {
  type: "object",
  properties: {
    login: { type: "string", required: true },
    password: { type: "string", required: true },
  },
};
const userSchema = {
  type: "object",
  properties: {
    login: { type: ["string", "number"], required: true },
    password: { type: "string", required: true },
  },
};

module.exports = {
  userSchema,
  userAdminSchema,
  userChallengerSchema,
};
