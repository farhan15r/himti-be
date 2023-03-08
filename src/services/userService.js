const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { user: User } = require('../../db/models');
const ClientError = require('../exceptions/ClientError');

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

module.exports = { getAllUsers, createUser, isUsernameAvailable };
