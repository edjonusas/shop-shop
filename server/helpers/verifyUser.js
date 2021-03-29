const userDb = require('../models/user');

function verify(token) {
  return new Promise((resolve, reject) => {
    userDb.findByToken(token).then((user) => {
      return user ? resolve(user) : reject(false);
    })
  }).catch(e => {
    console.log('Got error when verifying user')
  })
}

module.exports = verify;
