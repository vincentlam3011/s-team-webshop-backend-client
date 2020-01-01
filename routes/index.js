var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json('Welcome');
});

router.get('/getusers', (req, res) => {
  userModel.getAll()
  .then(data => {
    res.json({
      data,
    })
  })
  .catch(err => {
    res.json({err});
  })
})

module.exports = router;
