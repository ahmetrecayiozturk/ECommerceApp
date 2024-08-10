const productModel = require('../model/model.js');
const productService = require('../service/service.js');
const sellerUserModel = require('../../UserService/model/seller_model.js');

exports.createProduct = async (req, res) => {
    try {
        const { seller, category, name, price } = req.body;
        // Satıcı kullanıcı halihazırda var mı kontrol ediyoruz
        const isselleruserexist = await sellerUserModel.findOne({ email: seller }); // await eklenmiş durumda
        if (isselleruserexist) {
            const isproductexist = await productModel.findOne({ seller, category, name, price });
            if (!isproductexist) {
                const product = await productService.createProduct(seller, category, name, price);
                res.status(201).json({ message: 'Product created', product });
            } else {
                res.status(400).json({ message: 'Product already exists' });
            }
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body; // Düzeltme: req.body doğru şekilde yapılandırıldı
        const products = await productModel.find({ category: { $in: [category] } }); // Düzeltme: $in operatörü doğru kullanıldı
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/*
const productModel = require('../model/model.js');
const productService = require('../service/service.js');
const sellerUserModel = require('../../User/model/seller_model.js');
exports.createProduct = async (req, res) => {
    try {
        const { seller, category, name, price } = req.body;
        //Satıcı kullanıcı halihazırda var mı kontrol ediyoruz
        const isselleruserexist = sellerUserModel.findOne({email: seller});
        if(isselleruserexist){
        const isproductexist = await productModel.findOne({seller, category, name, price});
        if(!isproductexist){
            const product = await productService.createProduct(seller, category, name, price);
            res.status(201).json({message: 'Product created',product});
        }
        else(
            res.status(400).json({message: 'Product already exists'})
        )
    }
    } catch (error) {
        res.status(500).json({message: error.message, });
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const [category] = req.body;
        const products = await productModel.find({$in: category});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
*/