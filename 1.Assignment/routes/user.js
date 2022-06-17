const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {validate, User} = require('../models/user');

router.post('/signup',async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({phoneNumber: req.body.phoneNumber});
    if(user) return res.status(400).send('User already registered');

    user = new User({
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();
    res.header('x-auth-token',user.generateAuthToken()).send('User registered, Check header for token.');
});

router.post('/login',async (req,res) => {
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