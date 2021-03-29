const productModel = require('../models/product')
const serverError = require('../helpers/serverError')

module.exports = {
  indexProducts: async (req, res) => {
    let products

    try {
      products = await productModel.find({}).limit(8)
    } catch (e) {
      return serverError(res, "Server error occurred")
    }

    return res.send(products)
  },
  productBySlug: async (req, res) => {
    console.log(req.session)
    let slug = req.params.id
    let product

    try {
      product = await productModel.find({slug: slug}).limit(8)
    } catch (e) {
      return serverError(res, "Server error occurred")
    }

    return res.send(product[0])
  },
  productsByPage: async (req, res) => {
    let category = req.params.category
    let page = req.params.id
    let filter = category === "all" ? {} : {category: {"$in": [category]}}

    let products
    let total

    try {
      total = await productModel.countDocuments(filter)
      products = await productModel.find(filter).limit(12).skip(page*12)
    } catch (e) {
      return serverError(res, "Server error occurred")
    }

    return res.send({pages: Math.ceil(total / 12), data: products})
  }
}
