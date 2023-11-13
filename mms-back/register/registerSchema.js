const challengerSchema = {
  type: "object",
  properties: {
    lang: { type: "string", minLength: 2, maxLength: 2, required: true },
    surname: { type: "string", minLength: 1, required: true },
    name: { type: "string", minLength: 1, required: true },
    // middlename: { type: "string", required: true },
    dateBirth: { type: "string", minLength: 10, maxLength: 10, required: true },
    gender: { type: "number", required: true },
    passport: { type: "string", required: true },
    datePassport: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      required: true,
    },
    email: { type: "string" },
    password: { type: "string", minLength: 6, required: true },
    tel: { type: "string", minLength: 10, maxLength: 20, required: true },
    pin: { type: "string", minLength: 14, maxLength: 14, required: true },
    // token: { type: "string", minLength: 10, required: true },
  },
};

module.exports = {
  challengerSchema,
};
