const mongoose = require('mongoose');

const [Schema] = mongoose;

const soldedProductModel = new Schema({
    productCode: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    soldDate: {
        type: Date,
        default: Date.now
    },
    
    condition: {
        type: String,
        required: false,
        enum : ['Delivered','On The Way','Cancelled','Returned'],
        default: 'On The Way'
    },
})

const SoldedProductModel = mongoose.model('SoldedProduct', soldedProductModel);

module.exports = SoldedProductModel;