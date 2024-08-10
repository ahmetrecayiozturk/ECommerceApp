const mongoose = require('mongoose');

const {Schema} = mongoose;

const privateMessageSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const privateMessageModel = mongoose.model('Messages', privateMessageSchema);

module.exports = privateMessageModel;