const {validatePin, Wallet, validate} = require('../models/wallet');
const {validateTransaction, Transaction} = require('../models/transaction');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/currentBalance',async (req,res) => {
    const wallet = await Wallet.findOne({phoneNumber:req.user.phoneNumber});
    res.send(`Current Balance: ${wallet.balance}`);
});

router.post('/activate',async (req,res) => {
    const {error} = validatePin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const pin = await bcrypt.hash(req.body.pin,10);
    const wallet = new Wallet({pin:pin,phoneNumber:req.user.phoneNumber});
    wallet.save();
    res.send('Wallet Activated');
});

router.post('/addMoney',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const wallet = await Wallet.findOne({phoneNumber:req.user.phoneNumber});
    const isvalidPin = await bcrypt.compare(req.body.pin, wallet.pin);
    if(!isvalidPin) return res.status(400).send('Invalid Pin');

    const amount = parseInt(req.body.balance);
    if((10000 - wallet.balance) < amount) return res.status(400).send(`Balance Overload. Maximum Limit: 10000. Current Balance:${wallet.balance}`);
    wallet.balance += amount;
    const transaction = new Transaction({
        sender: wallet.phoneNumber,
        reciever: wallet.phoneNumber,
        amount: req.body.balance
    });
    transaction.save();
    wallet.transactions.push(transaction._id);
    wallet.save();
    res.send(`Money Added Successfully`);
});

router.post('/transfer', async (req, res) => {
    const {error} = validateTransaction(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const wallet = await Wallet.findOne({phoneNumber:req.user.phoneNumber});
    const isvalidPin = await bcrypt.compare(req.body.pin, wallet.pin);
    if(!isvalidPin) return res.status(400).send('Invalid Pin');

    const amount = parseInt(req.body.amount);
    if((10000 - wallet.balance) < amount) return res.status(400).send(`Balance undermined.Current Balance:${wallet.balance}`);

    const recieverWallet = await Wallet.findOne({phoneNumber: req.body.reciever});
    if(!recieverWallet) return res.status(400).send('No such reciever exists.');
    if((10000 - recieverWallet.balance) < amount) return res.status(400).send(`Cannot Send. Amount Exceded`);

    recieverWallet.balance += amount;
    wallet.balance -= amount;

    const transaction = new Transaction({
        sender: wallet.phoneNumber,
        reciever: wallet.phoneNumber,
        amount: req.body.balance
    });
    transaction.save();
    wallet.transactions.push(transaction._id);
    wallet.save();
    recieverWallet.save();

    const memo = await Transaction.findById(transaction._id).select('reciever amount date -_id');
    res.send(`Money transfered successfully. Details ${memo}`);
});

module.exports = router;