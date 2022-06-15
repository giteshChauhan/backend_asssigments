const config = require('config');
const mongoose = require('mongoose');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        length: 10,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min:8,
        max:1024
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id, phoneNumber:this.phoneNumber},config.get('jwtprivatekey'));
}

const User = mongoose.model('user',userSchema);

function validateUser(user){
    const schema = Joi.object({
        phoneNumber: Joi.string().length(10).required(),
        password: passwordComplexity().required()
    });
    return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;