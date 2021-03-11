// Michel: Creating table Setting
module.exports = function (sequelize, DataTypes) {
  const Setting = sequelize.define('Example', {
    ncolor: DataTypes.STRING,
  });

  // Michel: Setting belongs to User, this allow to join with the user ID to get user name
  Setting.associate = function (models) {
    Setting.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Setting;
};
