//we handle the request and response from frontend at the this page
const UserModel = require('../model/customer_model.js');
const UserService = require('../service/customer_service.js');

exports.register = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.registerUser(email, password); // successRes yerine user değişkenini kullandım
        res.status(201).json({
            message: "user created",
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async function(req, res, next) {
    try {
        
        const { email, password } = req.body;

        const user = await UserService.checkUser(email);

        if(!user) {
            throw new Error("User not found");
        } 

        const isMatch = await user.comparePassword(password);

        if(isMatch ===false){
            throw new Error("Wrong password");
        }

        let tokenData = {_id:user._id, email:user._email}

        const token = await UserService.generateToken(tokenData,"secretKey","1h");

        res.status(200).json({status:true, token:token})
        
    } catch (error) {
        next(error);
    }
};


exports.getUserId = async function(req, res, next) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            // Assuming the ID field in your schema is named 'Id'
            const id = user.Id;
             // Correctly access the Id property
            res.status(200).json({ userId: id });
        }
    } catch (error) {
        next(error);
    }
};