const productModel = require('../model/model.js');

class ProductService {
    static async createProduct(seller, category, name, price) {
        try {
            const product = new productModel({seller, category, name, price});
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;