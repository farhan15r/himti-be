const tokenService = require('../services/tokenService');

const authGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // remove Bearer from string

    const decoded = tokenService.decodeAccessToken(token);

    req.username = decoded.username;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authGuard;
