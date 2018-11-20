const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const ENV = require('../ENV');

const  userModel = new Schema({
    'email': {
        type: String, 
        required: true,
        unique: true
    }, 
    'password': {
        type: String, 
        required: true
    },
    cities:[String]

}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

userModel.pre('save', function(next){
    console.log(this);
    this.password = bcrypt.hashSync(this.password, ENV.BCRYPT_SALT_ROUND);
    next();
});
module.exports = mongoose.model("User", userModel);