const SoldedProductService = require('../service/soldedproductservice') ;

exports.createSoldedProduct = async (req,res)=>{
    try {
        const {name, productCode, sellerId, customerId, quantity, price} = req.body;
        const soldedproduct = SoldedProductService.createSoldedProduct(name, productCode, sellerId, customerId, quantity, price);
        res.status(201).json({message: 'Product created', soldedproduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getAllSoldedProductsForSeller = async (req, res) => {
    try {
        const {sellerId } = req.body;
        const products = await SoldedProductService.getAllSoldedProductsForSeller(sellerId);
        res.status(201).json({ message: 'Products', products });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.getAllSoldedProductsForCustomer = async (req, res) => {
    try {
        const {customerId } = req.body;
        const products = await SoldedProductService.getAllSoldedProductsForCustomer(customerId);
        res.status(201).json({ message: 'Products', products });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.attachedProductDelivered = async (req, res) => {
    try {
        const {productCode} = req.body;
        await SoldedProductService.attachedProductDelivered(productCode);
        res.status(201).json({ message: 'Product delivered' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.attachedProductCancelled = async (req,res) =>{
    try {
        const {productCode} = req.body;
        await SoldedProductService.attachedProductCancelled(productCode);
        res.status(201).json({ message: 'Product cancelled' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.attachedProductReturned = async (req,res) =>{
    try {
        const {productCode} = req.body;
        await SoldedProductService.attachedProductReturned(productCode);
        res.status(201).json({ message: 'Product returned' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}