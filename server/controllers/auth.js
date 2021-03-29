const userModel = require('../models/user')
const sha1 = require('sha-1');
const sendEmail = require('../helpers/sendEmail')
const randomId = require('random-id');
const serverError = require('../helpers/serverError')

let validEmail = (email) => {
  let mailRegex = /^\S+@\S+\.\S+$/
  return  mailRegex.test(email)
}

module.exports = {
  register: async (req, res) => {
    let email = req.body.email
    let passwordOne = req.body.passwordOne
    let passwordTwo = req.body.passwordTwo

    if(!validEmail(email)) {
      return serverError(res, "Email is incorrect")
    }

    if(passwordOne !== passwordTwo) {
      return serverError(res,  "Password does not match")
    }

    let emailExists

    try {
      emailExists = await userModel.find({email: email})
    } catch (e) {
      console.log(e)
    }

    if(emailExists.length > 0) {
      return serverError(res,  "This email is already taken")
    } else {
      let user = new userModel({
        email: email,
        password: sha1(passwordOne)
      })
      await user.save()
      await user.generateAuthToken()

      return res.send({success: true, message: "User created, you can login"})
    }
  },
  login: async(req, res) => {
    let email = req.body.email
    let password = req.body.password

    if(!validEmail(email)) {
      return serverError(res, "Email is incorrect")
    }

    let user

    try {
      user = await userModel.find({email: email, password: sha1(password)})
    } catch (e) {
      console.log(e)
    }

    if(user.length > 0) {
      req.session.token = user[0].tokens[0].token;
      // req.session.save()

      // console.log(req.session)
      return res.send({success: true, message: "logged in succesfully", token: user[0].tokens[0].token})
    } else {
      return serverError(res, "Wrong email or password")
    }
  },
  recover: async (req, res) => {
    let email = req.body.email

    if(!validEmail(email)) {
      return serverError(res, "Email is incorrect")
    }

    let user

    try {
      user = await userModel.find({email: email,})
    } catch (e) {
      console.log(e)
    }

    if(user.length > 0) {
      let randomPass = randomId(10, 'a0')
      await userModel.findOneAndUpdate({email: email}, {$set: {password: sha1(randomPass)}})
      await sendEmail.passwordRecover(user[0].email, randomPass)

      return res.send({success: true, message: "New password created. Check your email."})
    }

    return serverError(res, "No such user")
  }
}
