module.exports = (db) => {
  db.User.create({
    firstName: 'Adam',
    lastName: 'Gates',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      lastName: 'Pearson',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      isAdmin: false
    }).then(() => {
      db.Subscription.create({
        name: 'Netfilx',
        amount: 7.99,
        due: '4/25/2021',
        isAnnual: false,
        user_Id: 2
      }).then(() => {
        db.Setting.create({
          color: 'blue',
          user_id: 2
        })
      });
    });
  });
};
