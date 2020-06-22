const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDb database connection established successfully')
})

const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/user')
app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})