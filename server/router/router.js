const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const productsController = require("../controllers/products");
const ordersController = require("../controllers/orders");
const postsController = require("../controllers/post");
const commentsController = require("../controllers/comment");

// AUTH
router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.post("/api/recover", authController.recover);

// GET PRODUCTS
router.get("/api/getIndexProducts", productsController.indexProducts);
router.get("/api/product/:id", productsController.productBySlug);
router.get("/api/products/:category/:page", productsController.productsByPage);

//GET POSTS
router.get("/api/posts", postsController.getPosts);
router.get("/api/post/s/:slug", postsController.getPostBySlug);
router.get("/api/recentPosts", postsController.getRecentPosts);

// ORDERS
router.post("/api/createOrder", ordersController.createOrder);
router.post("/api/getUserOrders", ordersController.getUserOrders);

//ADD VIEW
router.put("/api/post/add/view/:id", postsController.addView);

//ADD COMMENT
router.post("/api/comment/add", commentsController.addComment);

module.exports = router;
