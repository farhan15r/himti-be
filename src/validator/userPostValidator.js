/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');
const ClientError = require('../exceptions/ClientError');

const userPostValidator = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string()
      .regex(/^[a-zA-Z]+[a-zA-Z0-9_]*$/)
      .required()
      .max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  });

  // return schema.validate(payload);

  const { error } = schema.validate(payload);
  if (error) {
    throw new ClientError(error.message);
  }
};

module.exports = userPostValidator;
