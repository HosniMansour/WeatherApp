module.exports = (req, res, next)=>{
    if(req.body.password == undefined || req.body.email == undefined){
        return res.status(403)
        .json({
            error:true,
            message:"password and email a required fields"
        });
    }
    if(req.body.password.length < 6){
        return res.status(403)
        .json({
            error:true,
            message:"Passowrd must be at least 6 character"
        });
    }
    next()
}