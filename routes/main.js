var router = require('express').Router();
var User = require('../models/user');

router.get('/', (req, res) => {
  res.render('main/home');
});

router.get('/about', (req, res) => {
  res.render('main/about');
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  })
})

module.exports = router;
