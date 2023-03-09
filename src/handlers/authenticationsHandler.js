const authPostValidator = require('../validator/authPostValidator');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const postHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    authPostValidator(payload);

    const user = await userService.getUserByUsername(payload.username);
    await userService.comparePassword(payload.password, user.password);

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    await tokenService.saveRefreshToken(refreshToken);

    res.status(200).json({
      code: 200,
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

module.exports = { postHandler };
