const privateMessageModel = require('../model/model.js');

exports.sendMessage = async function(req, res) {
    try {
        //karşıdaki kişinin id'sini getuserid fonksiyonu ile alıyoruz ve burada da onu kullanacağız
        const { userID, message } = req.body;
        const newMessage = new privateMessageModel({ userID:userID, message: message });
        await newMessage.save();
        res.status(200).json({ message: 'Private message added for user ID: ' + userID });
    } catch (error) {
        throw error;
    }
};
exports.getMessages = async function(req, res) {
    try {
        //kişinin id'sini getuserid fonksiyonu ile alıyoruz ve burada da onu kullanacağız
        const { userID } = req.body;
        const messages = await privateMessageModel.find({ userID: userID });
        res.status(200).json(messages);
    } catch (error) {
        throw error;
        console.log("Hata, böyle birisi yok");
    }
};


/*-----------------------------------------HATALARIMIZI GÖRELİM Kİ BİR DAHA YAPMAYALIM---------------------------------------------- 
GPt'nin Yazdırdığı
exports.getPrivateMessagesForUser = async function(req, res, next) {
    try {
        const { userID } = req.params; // GET isteklerinde params kullanılır
        const messages = await privateMessageModel.find({ userID: userID }).select({ message: 1, _id: 0 });
        const messageArray = messages.map(msg => msg.message);
        res.status(200).json(messageArray);
    } catch (error) {
        next(error);
    }
}
*/
/* Burası Çok Önemli Kalmalı
exports.getPrivateMessagesForUser = async function(req, res, next) {
    try {
        const { userID } = req.body;
        const messages = await privateMessageModel.find({ userID: userID });
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
*/


/*
const messageModel = require('../messagemodel/messagemodel.js');

exports.addMessagePrivateForUser = async function(req, res, next) {
    try {
        const { userID, messageContent } = req.body;
        const newMessage = new messageModel({ userID, messageContent });
        await newMessage.save();
        res.status(200).json({ message: 'Message added for user ID: ' + userID });
    } catch (error) {
        next(error);
    }
};

exports.addMessagePublic = async function(req, res, next) {
    try {
        const { messageContent } = req.body;
        const newMessage = new messageModel({ messageContent });
        await newMessage.save();
        res.status(200).json({ message: 'Public message added' });
    } catch (error) {
        next(error);
    }
};

exports.getPrivateMessagesForUser = async function(req, res, next) {
    try {
        const { userID } = req.params;
        const messages = await messageModel.find({ userID });
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};

exports.getPublicMessages = async function(req, res, next) {
    try {
        const messages = await messageModel.find({});
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
*/

/*
const messageModel = require('../messagemodel/messagemodel.js');

async function addMessagePrivateForUser(userID, messageContent){
    const newMessage = new messageModel({userID, messageContent});
    return await newMessage.save();
    console.log(`Message added for user ID: ${userId}`);
}

async function addMessagePublic(messageContent){
    const newMessage = new messageModel({messageContent});
    return await newMessage.save();
}

async function getPrivateMessagesForUser(userID){
    return await messageModel.find({userID});
}

async function getPublicMessages(){
    return await messageModel.find({});
}
*/