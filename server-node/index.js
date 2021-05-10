const express = require("express");
const app = express();
const cors = require("cors")

const config = require("./config/key");

app.use(cors())

const port = 5000;

app.use('/api/comments', require('./routes/comments'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});