var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

mongoose.Promise = Promise;

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-user', (req, res, next) => {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save((err) => {
    if(err) return next(err);

    res.json('Successfully created a user');
  });
});

app.listen(3000, (err) => {
  if(err) throw err;
  console.log('Server is running');
});