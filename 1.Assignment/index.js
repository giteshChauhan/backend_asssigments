const mongoose = require('mongoose');
const express = require('express');
const app = express();
const user = require('./routes/user');

app.use(express.json());
app.use('/api/user',user);

mongoose.connect('mongodb://localhost/backend_assignment_1')
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.log('Something failed ',err));

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}.`));