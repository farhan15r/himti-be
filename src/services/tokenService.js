const jwt = require('jsonwebtoken');
const { authentication: Authentication } = require('../../db/models');

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);

  return token;
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  return token;
};

const saveRefreshToken = async (refreshToken) => {
  await Authentication.create({ refresh_token: refreshToken });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
};
