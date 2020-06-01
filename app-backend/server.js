const express = require("express");
const mongoose = require("mongoose");
const config = require('config');

const app = express();

//cors for cross domain request
var cors = require('cors');

//express body parser'
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//fetching with mongoDB uri 
const db = config.get("mongoURI");
console.log(db);
//connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'x-auth-token'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get("/serverCheck", (req, res) => {
  return res.json({ "server": "running now!!" });
});
//using routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
const port = process.env.port || 5000;

//Start server

app.listen(port, () => console.log(`Server running on port ${port}`));

