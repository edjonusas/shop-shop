const productModel = require('../models/order')
const serverError = require('../helpers/serverError')
const ordersDatabase =require('../models/order')
const verifyUser = require('../helpers/verifyUser')
const userDatabase = require('../models/user')
const paypal = require('paypal-rest-sdk');
const sendEmail = require('../helpers/sendEmail')

let state = process.env.PRODUCTION === "true";
// PAYPAL STUFF
paypal.configure({
  'mode': state ? 'live' : 'sandbox', //sandbox or live
  'client_id': state ? process.env.PAYPAL_ID : process.env.PAYPAL_SANDBOX_ID,
  'client_secret': state ? process.env.PAYPAL_SECRET : process.env.PAYPAL_SANDBOX_SECRET
});

module.exports = {
  createOrder: async (req, res) => {
    const user = req.body.user
    const order = req.body.order
    let dbUser

    if(order.paypal.state === 'approved') {

      if(user.loggedIn) {
        try {
          dbUser = await verifyUser(user.token)
        } catch (e) {
          console.log('GOT ERROR IN PAYMENT')
        }
      }

      let newOrder = new ordersDatabase({
        shippingInfo: order.user.shipping,
        userRegistered: user.loggedIn,
        user: user.loggedIn ? dbUser._id : null,
        products: order.user.products,
        totalAmount: order.user.total,
        paypal: order.paypal
      })
      await newOrder.save()

      await sendEmail.orderMade(order.user.shipping.email, order)

      res.send({success: true})
    }
  },
  getUserOrders: async (req, res) => {
    let token = req.body.token
    let user
    try {
      user = await verifyUser(token)
    } catch (e) {
      console.log('Error in getting user orders')
    }

    let orders = await ordersDatabase.find({
      user: user._id,
      userRegistered: true
    })

    res.send(orders)
  }
}
