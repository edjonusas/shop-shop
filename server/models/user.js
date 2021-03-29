const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  orders: {
    type: Array
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.index({email: 1, password: 1});

userSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.SESSION_KEY).toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(()=> {
    return token
  })
};

userSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SESSION_KEY)
  } catch (e) {
    //MAKE SOME KIND OF ERROR HANDLER
    console.log("ERROR >>> USER NOT VALID")
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  }, {
    _id: 1,
    orders: 1,
    email: 1
  })
  //RETURNS ONLY IF OF THE USER
};


const user = mongoose.model('user', userSchema);

module.exports = user;
