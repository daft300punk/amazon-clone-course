var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

var dbConfig = require('./db.config');
var dbUrl = `mongodb://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@ds135577.mlab.com:35577/daft300punk-ecomm`
mongoose.connect(dbUrl, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to db');
  }
});

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json("YOYO");
})

app.listen(3000, (err) => {
  if(err) throw err;
  console.log('Server is running');
});