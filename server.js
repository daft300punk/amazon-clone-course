var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var User = require('./models/user');

var app = express();

mongoose.Promise = Promise;

var dbConfig = require('./config/db.config');
var dbUrl = `mongodb://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@ds135577.mlab.com:35577/daft300punk-ecomm`;
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to db');
  }
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'absi',
  store: new MongoStore({ url: dbUrl, autoReconnect: true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server is running');
});