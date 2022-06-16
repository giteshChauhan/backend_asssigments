const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {validate, User} = require('../models/user');

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({phoneNumber: req.body.phoneNumber});
    if(!user) return res.status(400).send('Invalid phone number or password');

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return res.status(400).send('Invalid phone number or password');
    
    const token = user.generateAuthToken()
    res.send(token);
});

module.exports = router;

