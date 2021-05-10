const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require("./config/key");

const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.json());

const port = 5000;

app.use('/api/comments', require('./routes/comments'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});