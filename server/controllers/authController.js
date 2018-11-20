const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT =  require('jsonwebtoken');
const ENV = require('../ENV');

module.exports = {
    register: (req, res, next)=>{
        let email = req.body.email;
        let password = req.body.password;

        /**
         * Verify user input
         * Regex for mails, password length ...
         */
        try{
            let user = new User({
                email, password
            });

            console.log(user.toObject());
            user.save();
            return res.status(200)
                .json(user);
        }catch(e){
            return res.status(500)
                .json({
                    error:true,
                    message: "Unexpected error occured while trying to create your account",
                    err: e
                });
        }
    },
    login: (req, res, next)=>{
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({
            email
        })
            .exec()
            .then(
                user=>{
                    if(user){
                        if(bcrypt.compareSync(password, user.password)){
                            let token = JWT.sign({
                                user_id: user._id
                            }, ENV.JWT_KEY, {expiresIn: ENV.JWT_EXPIRE_TIME} );
                            user = user.toObject();
                            delete user.password;
                            return res.status(200)
                                .json({
                                    token, user
                                })
                        }else{
                            return res.status(401)
                                .json({
                                    error:true,
                                    message:"Wrong email/password combinisation"
                                })
                        }
                    }else{
                        return res.status(401)
                            .json({
                                error:true,
                                message:"Wrong email/password combinisation"
                            });
                    }
                }
            )
            .catch(
                e=>{
                    return res.status(500)
                        .json({
                            error:true,
                            message: "Unexpected error occured while trying to authenticate your account",
                            err: e
                        });
                }
            )
    },

    /**
     * get
     */
    get: function (req, res) {
        const id = req.params.id;
        User.findOne({_id: id}, function (err, categorie) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!categorie) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(categorie);
        });
    },

    /**
     * taskController.update()
     */
    update: function (req, res) {
        const id = req.params.id;
        const city = req.params.city;
        User.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.cities = User.cities.push(city);

            User.save(function (err, task) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating task.',
                        error: err
                    });
                }

                return res.json(task);
            });
        });
    },
};
