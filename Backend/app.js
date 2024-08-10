// express'i import edelim
const express = require('express');
// app'i oluşturalım
const app = express();
// body parser'i require edelim
const bodyParser = require('body-parser');
// path ve session modüllerini require edelim
const path = require('path');
const session = require('express-session');
// app'in body parser'i kullanmasını sağlayalım
app.use(bodyParser.json());

// session kullanımı
app.use(session({
    secret: 'devast',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// router'i export edelim
const Routers = require('./routers/routers.js');

// app üzerinde router'i kullanalım
app.use('/', Routers);
app.use(express.static(path.join(__dirname, 'public')));

// express ve http modüllerini import edelim
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

const UserModel = require('./UserService/model/customer_model.js');
const MessageModel = require('./MessageService/model/model.js');

// Socket.IO bağlantısı
io.on('connection', (socket) => {
    console.log(`Kullanıcı bağlandı: ${socket.id}`);

    socket.on('join', async ({ email }) => {
        try {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                const userId = user._id; // .Id yerine ._id kullanımı
                socket.join(userId);
                console.log(`Kullanıcı ${userId} odaya katıldı.`);
            } else {
                console.log('Kullanıcı bulunamadı.');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    });

    socket.on('sendMessage', async ({ senderEmail, receiverEmail, message }) => {
        try {
            const senderUser = await UserModel.findOne({ email: senderEmail });
            const receiverUser = await UserModel.findOne({ email: receiverEmail });

            if (senderUser && receiverUser) {
                const senderId = senderUser._id; // .Id yerine ._id kullanımı
                const receiverId = receiverUser._id; // .Id yerine ._id kullanımı

                // Mesajı Socket.IO ile gönder
                io.to(receiverId).emit('message', {
                    senderId: senderId,
                    senderEmail: senderEmail,
                    message: message,
                });

                // Mesajı MongoDB'ye kaydet
                const newMessage = new MessageModel({ userID: receiverId, message: message });
                await newMessage.save();
            } else {
                console.log('Gönderici veya alıcı bulunamadı.');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Kullanıcı ayrıldı: ${socket.id}`);
    });
});

// server'ı export edelim
module.exports = server;

/*
// express'i import edelim
const express = require('express');
// app'i oluşturalım
const app = express();
// path ve session modüllerini require edelim
const path = require('path');
const session = require('express-session');
// body parser'i require edelim
const body_parser = require('body-parser');
// app'in body parser'i kullanmasını sağlayalım
app.use(body_parser.json());
// router'i export edelim
const Routers = require('./routers/routers.js');
// app üzerinde router'i kullanalım
app.use('/', Routers);
app.use(express.static(path.join(__dirname, 'public')));

//session kullanımı

app.use(session({
    secret: 'devast',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// express ve http modüllerini import edelim
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

const UserModel = require('./UserService/model/customer_model.js');
const MessageModel = require('./MessageService/model/model.js');

// Socket.IO bağlantısı
io.on('connection', (socket) => {
    console.log(`Kullanıcı bağlandı: ${socket.id}`);

    socket.on('join', async ({ email }) => {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const userId = user.Id;
            socket.join(userId);
            console.log(`Kullanıcı ${userId} odaya katıldı.`);
        } else {
            console.log('Kullanıcı bulunamadı.');
        }
    });

    socket.on('sendMessage', async ({ senderEmail, receiverEmail, message }) => {
        const senderUser = await UserModel.findOne({ email: senderEmail });
        const receiverUser = await UserModel.findOne({ email: receiverEmail });

        if (senderUser && receiverUser) {
            const senderId = senderUser.Id;
            const receiverId = receiverUser.Id;

            // Mesajı Socket.IO ile gönder
            io.to(receiverId).emit('message', {
                senderId: senderId,
                senderEmail: senderEmail,
                message: message,
            });

            // Mesajı MongoDB'ye kaydet
            const newMessage = new MessageModel({ userID: receiverId, message: message });
            await newMessage.save();
        } else {
            console.log('Gönderici veya alıcı bulunamadı.');
        }
    });

    socket.on('disconnect', () => {
        console.log(`Kullanıcı ayrıldı: ${socket.id}`);
    });
});

// server'ı export edelim
module.exports = server;
*/