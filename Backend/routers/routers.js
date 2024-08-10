const router = require('express').Router();
const UserController = require('../UserService/controller/customer_controller.js');
const SellerUserController = require('../UserService/controller/seller_controller.js');
const ProductController = require('../ProductService/controller/controller.js');
const MessageController = require('../MessageService/controller/controller.js');

router.post('/registration-customer', (req, res, next) => {
    UserController.register(req, res, next);
});
router.post('/login-customer', (req, res, next) => {
    UserController.login(req, res, next);
});
router.post('/registration-seller', (req, res, next) => {
    SellerUserController.register(req, res, next);
});
router.post('/login-seller', (req, res, next) => {
    SellerUserController.login(req, res, next);
});
router.post('/get-customer-user-id', (req, res, next) => {
    UserController.getUserId(req, res, next);
});
router.post('/get-seller-user-id', (req, res, next) => {
    SellerUserController.getUserId(req, res, next);
});
router.post('/create-product', (req, res) => {
    ProductController.createProduct(req, res);
});
router.post('/get-products-by-category', (req, res) => {
    ProductController.getProductsByCategory(req, res);
});
router.post('/send-message', (req, res) => {
    MessageController.sendMessage(req, res);
});
router.post('/get-messages', (req, res) => {
    MessageController.getMessages(req, res);
});

module.exports = router;

/*
const router = require('express').Router();
const UserController = require('../UserService/controller/customer_controller.js');
const SellerUserController = require('../UserService/controller/seller_controller.js');
const ProductController = require('../ProductService/controller/controller.js');
const MessageController = require('../MessageService/controller/controller.js');
router.post('/registration-customer', (req, res, next) => {
    UserController.register(req, res, next)
});
router.post('/login-customer', (req, res, next) => {
    UserController.login(req, res, next)
});
router.post('/registration-seller', (req, res, next) => {
    SellerUserController.register(req, res, next)
});
router.post('/login-seller', (req, res, next) => {
    SellerUserController.login(req, res, next)
});
router.post('/get-customer-user-id', (req, res, next) => {
    UserController.getUserId(req, res, next)
});
router.post('/get-seller-user-id', (req, res, next) => {
    SellerUserController.getUserId(req, res, next)
});
router.post('/create-product', (req, res) => {
    ProductController.createProduct(req, res)
});
router.post('/get-products-by-category', (req, res) => {
    ProductController.getProductsByCategory(req, res)
});
router.post('/send-message', (req, res) => {
    MessageController.sendMessage(req, res)
});
router.post('/get-messages', (req, res) => {
    MessageController.getMessages(req, res)
});
module.exports = router;
*/