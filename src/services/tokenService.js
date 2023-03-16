const jwt = require('jsonwebtoken');
const { authentication: Authentication } = require('../../db/models');
const AuthenticationError = require('../exceptions/AuthenticationError');
const NotFoundError = require('../exceptions/NotFoundError');

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

const verifyRefreshToken = async (refreshToken) => {
  const token = await Authentication.findOne({
    where: { refresh_token: refreshToken },
  });

  if (!token) {
    throw new NotFoundError('Refresh token not found');
  }
};

const decodeRefreshToken = (refreshToken) =>
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      Authentication.destroy({
        where: { refresh_token: refreshToken },
      });

      throw new NotFoundError('Invalid refresh token');
    }
    return decoded;
  });

const decodeAccessToken = (accessToken) => {
  if (!accessToken) {
    throw new AuthenticationError('Access token not found');
  }

  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        throw new AuthenticationError('Invalid access token');
      }
      return decoded;
    }
  );
};

const deleteRefreshToken = async (refreshToken) => {
  await Authentication.destroy({
    where: { refresh_token: refreshToken },
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
  verifyRefreshToken,
  decodeRefreshToken,
  decodeAccessToken,
  deleteRefreshToken,
};
