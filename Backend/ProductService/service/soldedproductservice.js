const soldedProductModel = require('../model/soldedproductmodel.js');

class SoldedProductService{

    static async createSoldedProduct(name, sellerId, customerId, quantity, price){
    try {
        const generatedproductCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const soldedproduct = new soldedProductModel({
            name: name,    
            productCode: generatedproductCode,
            sellerId: sellerId,
            customerId: customerId,
            quantity: quantity,
            price: price});
        await soldedproduct.save();
    } catch (error) {
        throw error;
    }

    }
    //SATICININ TÜM SATTIĞI ÜRÜNLER GÖZÜKECEK, AYRICA HANGİ İŞLEMDE OLDUKLARI DA GÖZÜKECEK
    static async getAllSoldedProductsForSeller(sellerId){
        try {
            return await soldedProductModel.find({sellerId: sellerId});
        } catch (error) {
            
        }
    }
    //ALICININ TÜM ALDIĞI PRODUCTLAR GÖZÜKECEK
    static async getAllSoldedProductsForCustomer(customerId){
        try {
            return await soldedProductModel.find({customerId: customerId});
        } catch (error) {
            
        }
    }
    //DELİVERED OLUNCA PARA SATICIYA GİDECEK
    static async attachedProductDelivered(productCode){
        try {
            const product = await soldedProductModel.findOne({productCode});
            await product.updateOne({condition: 'Delivered'});
        } catch (error) {

        }
    }
    //İPTAL EDİLİNCE PARA İADESİ GERÇEKLEŞECEK
    static async attachedProductCancelled(productCode){
        try {
            const product = await soldedProductModel.findOne({productCode});
            await product.updateOne({condition: 'Cancelled'});
        } catch (error) {

        }
    }
    //RETURN OLUNCA PARA İADESİ GERÇEKLEŞECEK, RETURN OLMASI İÇİN İSE SATICININ GELDİĞİ ANDA ONAY VERMESİ GEREKİYOR
    static async attachedProductReturned(productCode){
        try {
            const product = await soldedProductModel.findOne({productCode});
            await product.updateOne({condition: 'Returned'});
        } catch (error) {

        }
    }
    //buna aslında gerek bile yok direkt tıkladığında o karta dönecek olan get all product'ta o karttaki productcode'yi direkt burada kullanabiliriz
    static async getProductCode(sellerId, customerId, name, condition){
        try {
            const product = await soldedProductModel.findOne({sellerId: sellerId, customerId: customerId, name: name, condition: condition});
            if (!product) {
                throw new Error('Product not found');
            }
            return product.productCode;
        } catch (error) {
            console.error('Error fetching product code:', error);
            throw error; // Hata mesajını çağıran yere döndür
        }
    }
}

module.exports = SoldedProductService;