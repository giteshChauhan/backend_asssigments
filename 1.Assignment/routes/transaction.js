const express = require('express');
const router = express.Router();
const {Transaction} = require('../models/transaction');

router.get('/', async (req, res) => {
    const passbook = await Transaction.find({$or:[{sender: req.user.phoneNumber}, {receiver: req.user.phoneNumber}]})
        .select('reciever date amount sender -_id');

    res.send(passbook);
});

module.exports = router;