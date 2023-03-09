const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { user: User } = require('../../db/models');
const ClientError = require('../exceptions/ClientError');
const AuthenticationError = require('../exceptions/AuthenticationError');

const getAllUsers = async () => User.findAll();

const isUsernameAvailable = async (username) => {
  const user = await User.findOne({ where: { username } });

  if (user) {
    throw new ClientError('Username already exists');
  }
};

const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return User.create({
    id: nanoid(50),
    username: payload.username,
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  }).then((user) => user.dataValues);
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new AuthenticationError('Username or password is wrong');
  }

  return user.dataValues;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw new AuthenticationError('Username or password is wrong');
  }
};

module.exports = {
  getAllUsers,
  createUser,
  isUsernameAvailable,
  getUserByUsername,
  comparePassword,
};
