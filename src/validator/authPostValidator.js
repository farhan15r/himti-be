const Joi = require('joi');
const ClientError = require('../exceptions/ClientError');

const authPostValidator = (payload) => {
  const schema = Joi.object({
    username: Joi.string().required().max(50),
    password: Joi.string().required(),
  });

  // return schema.validate(payload);

  const { error } = schema.validate(payload);
  if (error) {
    throw new ClientError(error.message);
  }
};

module.exports = authPostValidator;
