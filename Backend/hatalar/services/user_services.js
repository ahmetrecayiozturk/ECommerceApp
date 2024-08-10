//we do crud operations

const UserModel = require('../model/user_model');
const jwt = require('jsonwebtoken');
//UserService class'ının oluşturulmaso
class UserService{
    //bir asenkron registerUser Fonksiyonu oluşturulur ve bu fonksiyon email ve password almaktadır
    static async registerUser(email, password){
        //burda ilk olarak bir user oluşturulur ve bu user crud işlemlerinden biri olan save işlemini yapar
        try {
            const createUser = new UserModel({email,password})
            return await createUser.save();
        }
        //hata durumunda hata handle edilir
        catch (error) {
            throw error;
        }
    }

    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }

    }

    static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    }
}


//sonra da bu UserService export edilir
module.exports = UserService;



































/*
//GPT KISMI

const { exportUserModel } = require("../model/user_model");

const registerUser = async (req, res) => {
  try {
    const newUser = new exportUserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser };
*/




/*
const UserModel = require('../model/user_model');

const registerUser = async (req, res) => {
    try {
        const User = await UserModel();
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { registerUser };
*/



/*
const UserModel = require('../model/user_model');

class UserService {
    static async registerUser(email, password) {
        try {
            const createUser = new UserModel({ email, password });
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }
}
*/
//module.exports = UserService;
