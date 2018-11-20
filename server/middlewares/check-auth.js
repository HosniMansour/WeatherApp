const JWT = require('jsonwebtoken');
const ENV = require('../ENV');
const User = require('../models/User');

module.exports = (req, res, next)=>{
    try{

        let token = req.headers.authorization.split(' ')[0];
        let obj = JWT.verify(token, ENV.JWT_KEY );
        User.findOne({
            _id: obj.user_id
        })
        // todo
        .select('-password')
        .exec()
        .then(
            user=>{
                console.log(user);
                if(user){
                    req.user = user.toObject();
                    next();
                }else{
                    return res.status(401)
                    .json({
                        error:true,
                        message:"Un-authorized access",
                    })
                }
            }
        )
    }catch(e){
        return res.status(401)
        .json({
            error:true,
            message:"Un-authorized access",
            err: e
        })
    }
};