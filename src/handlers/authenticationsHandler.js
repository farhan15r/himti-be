const authPostValidator = require('../validator/authPostValidator');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const authPutValidator = require('../validator/authPutValidator');

const postHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    authPostValidator(payload);

    const user = await userService.getUserByUsername(payload.username);
    await userService.comparePassword(payload.password, user.password);

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    await tokenService.saveRefreshToken(refreshToken);

    res.status(201).json({
      code: 201,
      message: 'Authentication success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    authPutValidator(payload);
    await tokenService.verifyRefreshToken(payload.refreshToken);

    const user = tokenService.decodeRefreshToken(payload.refreshToken);
    const accessToken = tokenService.generateAccessToken(user);

    res.status(200).json({
      code: 200,
      message: 'Refresh token success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    await tokenService.verifyRefreshToken(payload.refreshToken);

    await tokenService.deleteRefreshToken(payload.refreshToken);

    res.status(200).json({
      code: 200,
      message: 'Logout success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postHandler, putHandler, deleteHandler };
