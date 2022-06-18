const mongoose = require('mongoose');
const Joi = require('joi');

const walletSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        length:10,
        unique:true
    },
    balance:{
        type: Number,
        min: 0,
        max: 10000,
        trim: true,
        default: 0 
    },
    pin:{
        type:String,
        length:8,
        required:true,
        trim:true
    },
    transactions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

const Wallet = mongoose.model('wallet',walletSchema);

function validatePin(pin){
    const Schema = Joi.object({
        pin: Joi.string().trim().length(8).required(),
    });
    return Schema.validate(pin);
}

function validateWallet(wallet){
    const Schema = Joi.object({
        balance: Joi.number().min(1).max(2000).required(),
        pin: Joi.string().trim().length(8).required(),
    });
    return Schema.validate(wallet);
}

exports.Wallet = Wallet;
exports.validatePin = validatePin;
exports.validate = validateWallet;