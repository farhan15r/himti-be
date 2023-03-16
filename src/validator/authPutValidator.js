const Joi = require('joi');
const ClientError = require('../exceptions/ClientError');

const authPutValidator = (payload) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  // return schema.validate(payload);

  const { error } = schema.validate(payload);
  if (error) {
    throw new ClientError(error.message);
  }
};

module.exports = authPutValidator;
