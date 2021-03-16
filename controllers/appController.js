module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Duy: Adds a subscription to the user's account
    createSub: function (req, res) {
      db.Subscription.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Duy: Deletes the subscripton from the user's account
    deleteSubcription: function (req, res) {
      db.Subscription.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    getSubscriptions: function (req, res) {
      db.Subscription.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    }
  };
};
