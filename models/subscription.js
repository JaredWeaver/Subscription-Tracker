// Michel: Creating table Subscription
module.exports = function (sequelize, DataTypes) {
  const Subscription = sequelize.define('Example', {
    name: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    due: DataTypes.DATE
  });

  // Michel: Subscription belongs to User, this allow to join with the user ID to get user name
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Michel: Subscription belongs to Setting, this allow to join with the user ID to get user color
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.Setting, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Subscription;
};
