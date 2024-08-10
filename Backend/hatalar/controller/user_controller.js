//we handle the request and response from frontend at the this page
const UserService = require('../../services/user_services');

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
