const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
      username: DataTypes.STRING(50),
      name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
