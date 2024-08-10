//we do crud operations
const UserModel = require('../model/customer_model.js');
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

















