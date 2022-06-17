const {validate, Wallet, walletSchema} = require('../models/wallet');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/activate',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const pin = await bcrypt.hash(req.body.pin,10);
    const wallet = new Wallet({pin:pin,phoneNumber:req.user.phoneNumber});
    wallet.save();
    res.send('Wallet Activated');
});

// router.post('/addMoney',async (req,res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

// });

module.exports = router;