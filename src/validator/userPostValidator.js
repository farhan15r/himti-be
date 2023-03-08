/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');
const ClientError = require('../exceptions/ClientError');

const userPostValidator = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.ref('password'),
  });

  // return schema.validate(payload);

  const { error } = schema.validate(payload);
  if (error) {
    throw new ClientError(error.message);
  }
};

module.exports = userPostValidator;
