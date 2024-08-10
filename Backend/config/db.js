
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:Password@mydatabase.bgb3ppk.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database, The URI is: ' + process.env.DB_URI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

module.exports = connection;


