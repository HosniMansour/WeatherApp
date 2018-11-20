const User = require('../models/User');
module.exports = (req, res, next)=>{
    
    /**
     * Regex pour email
     */
    User.findOne({
        email: req.body.email
    })
    .exec()
    .then(
        user=>{
            if(user){
                return res.status(403)
                .json({
                    error:true,
                    message:"You have already an account with this email address"
                });
            }else{
                next();
            }
        }
    )
    .catch(
        e=>{
            return res.status(500)
            .json({
                error:true, 
                message:"Error while trying to create your account please try again or report this to support@trustit.work"
            });
        }
    )
};