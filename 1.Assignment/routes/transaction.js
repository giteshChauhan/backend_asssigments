const express = require('express');
const router = express.Router();
const {Transaction} = require('../models/transaction');

router.get('/', async (req, res) => {
    const passbook = await Transaction.find({sender: req.user.phoneNumber})
        .select('reciever date amount -_id -sender');

    res(passbook);
});

module.exports = router;