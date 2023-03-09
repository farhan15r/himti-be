const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authentication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Authentication.init(
    {
      refresh_token: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Authentication',
      timestamps: false,
    }
  );
  return Authentication;
};
