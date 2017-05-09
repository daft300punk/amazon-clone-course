var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json("YOYO");
})

app.listen(3000, (err) => {
  if(err) throw err;
  console.log('Server is running');
});