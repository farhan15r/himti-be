const userService = require('../services/userService');
const userPostValidator = require('../validator/userPostValidator');

const getHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      code: 200,
      message: 'OK',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    userPostValidator(payload);
    await userService.isUsernameAvailable(payload.username);

    const user = await userService.createUser(payload);

    res.status(201).json({
      code: 201,
      message: 'Created',
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHandler,
  postHandler,
};
