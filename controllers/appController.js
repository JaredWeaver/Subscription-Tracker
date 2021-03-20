const moment = require('moment');
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
    // Duy: Gets a single sub
    getOneSub: function (req, res) {
      db.Subscription.findOne({ where: { id: req.params.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Duy: Edits existing sub
    updateSub: (req, res) => {
      db.Subscription.update({
        name: req.body.name,
        amount: req.body.amount,
        due: req.body.due,
        renew: req.body.renew
      }, {
        where: { id: req.params.id }
      }).then(result => {
        res.json(result);
      });
    },
    getSubscriptions: function (req, res) {
      db.Subscription.findAll({ 
        where: { UserId: req.session.passport.user.id },
        order: [['due', 'ASC']]
      }).then
            (function (dbExamples) {
              // console.log(dbExamples);
              dbExamples = dbExamples.map(Subscription => {
                console.log('due',Subscription.dataValues.due)
                Subscription.dataValues.newDue = moment(Subscription.dataValues.due).format('l');
                console.log('newDue',Subscription.dataValues.newDue)
                return Subscription

              });
              // console.log(dbExamples)

        res.json(dbExamples);
      });
    }
  };
};
