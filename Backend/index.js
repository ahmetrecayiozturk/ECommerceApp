const dotenv = require('dotenv');
const connection = require('./config/db');
const server = require('./app'); // `server`ı `app.js`ten alın

// dotenv'in config fonksiyonunu çalıştıralım, bu bizim .env içindeki elemanları okumamızı sağlayacaktır
dotenv.config();

// Veritabanına bağlantı
connection();

// Port tanımlaması
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//---------------çalışan şekliiiii-----------------------
/*
const dotenv = require('dotenv');
//const UserModel = require('../model/user_model');
const connection = require('./config/db')
const app = require('./app');
// dotenv'in config fonksiyonunu çalıştıralım, bu bizim .env içindeki elemanları okumamaızı sağlayacaktır
dotenv.config();
//connection to the database, burada database'ye bağlandık
connection();
//localhostta bir mesaj yazdıralım
app.get('/', (req,res)=>{
    res.send("this server is wwwwwwwwworking bro ")
})
//port
const port = 3000;
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
});
*/