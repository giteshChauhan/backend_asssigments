const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
require('express-async-errors');
const user = require('./routes/user');
const login = require('./routes/login');

app.use(express.json());
app.use('/api/user',user);
app.use('/api/login',login);

mongoose.connect(config.get('db'))
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.log('Something failed ',err));

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}.`));