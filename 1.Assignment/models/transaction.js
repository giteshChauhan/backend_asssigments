const mongoose = require('mongoose');
const Joi = require('joi');

const transactionSchema = new mongoose.Schema({
    sender:{
        type: String,
        length: 10,
        required: true
    },
    reciever:{
        type: String,
        length: 10,
        required: true
    },
    amount:{
        type:Number,
        min: 1,
        max: 2000,
        required: true
    },
    date: { type:Date, required:true, default: Date.now}
});

const Transaction = mongoose.model('transaction',transactionSchema);

function validateTransaction(transaction){
    const Schema = Joi.object({
        reciever: Joi.string().trim().length(10).required(),
        amount: Joi.number().min(1).max(2000).required(),
        pin: Joi.string().trim().length(8).required()
    });
    return Schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validateTransaction = validateTransaction;