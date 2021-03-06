// Michel: Creating table Subscription
module.exports = function (sequelize, DataTypes) {
  const Subscription = sequelize.define('Subscription', {
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    due: DataTypes.DATEONLY,
    renew: DataTypes.STRING
  });

  // Michel: Subscription belongs to User, this allow to join with the user ID to get user name
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Subscription;
};
