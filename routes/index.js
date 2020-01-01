var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');
var productModel = require('../models/ProductModel');

var passport = require('passport');
var jwt = require('jsonwebtoken');

var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json('Welcome');
});

router.post('/login', (req, res, next) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (user === false) {
      res.json({ user, info })
    }
    else {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        let payload = { id: user.loginUser.id };
        const token = jwt.sign(payload, 's_team_webshop');
        return res.json({ user, token, info });
      });
    }
  })(req, next);
});

router.get('/getAllProducts', (req, res) => {
  productModel.getAllProducts()
  .then(data => {
    res.json({
      code: 1,
      info: {
        data,
        message: "1",
      }
    })
  })
  .catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})

module.exports = router;
