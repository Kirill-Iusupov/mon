const { Validator } = require("jsonschema");

const validate = (data, schema) => {
  //   const val = new Validator().validate(data, schema);
  //   console.log({ val });
  //   console.log(val.errors);
  //   console.log(val.valid);
  //   return val.valid;
  return new Validator().validate(data, schema).valid;
};

module.exports = validate;
