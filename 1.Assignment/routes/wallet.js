const {validatePin, Wallet, validate} = require('../models/wallet');
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

    if(10000 - wallet.balance < req.body.balance) return res.status(400).send(`Balance Overload. Maximum Limit: 10000. Current Balance:${wallet.balance}`);
    wallet.balance += req.body.balance;
    wallet.save();
    res.send(`Money Added Successfully`);
});

module.exports = router;