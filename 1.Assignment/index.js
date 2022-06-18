const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
require('express-async-errors');
const user = require('./routes/user');
const wallet = require('./routes/wallet');
const transaction = require('./routes/transaction');
const auth = require('./middleware/auth');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/user',user);
app.use('/api/wallet',auth,wallet);
app.use('/api/transaction',auth,transaction);

mongoose.connect(config.get('db'))
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.log('Something failed ',err));

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}.`));