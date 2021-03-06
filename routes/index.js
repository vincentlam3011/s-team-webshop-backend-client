var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');
var productModel = require('../models/ProductModel');
var categoryModel = require('../models/CategoryModel');
var bankingCardModel = require('../models/BankingCardModel');
var invoiceModel = require('../models/InvoiceModel');

var passport = require('passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var router = express.Router();
/* GET home page. */
router.post('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json('Welcome');
});

router.post('/login', (req, res, next) => {
  // Body ngoài email và password thì cần biến type:
  // Type = 0: login bên user (login khách hàng)
  // Type = 1 hoặc 2: login bên admin (nhân viên và admin)
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

router.post('/register', (req, res, next) => {

  userModel.addUser(req.body, 0).then(data => {
    console.log('data:', data);
    let id = data.insertId;
    bankingCardModel.addBlankCard(id).then(result => {
      res.json({
        code: 1,
        info: {
          data: req.body,
          message: "Registered Successfull",
        }
      })
    }).catch(err => {
      res.json({
        code: 0,
        info: {
          message: err,
        }
      })
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
});
router.post('/addEmployee', (req, res, next) => {
  userModel.addUser(req.body, 1).then(data => {
    let id = data.insertId;
    userModel.addEmployee(id).then(result => {
      res.json({
        code: 1,
        info: {
          data: req.body,
          message: "Add user Successfull",
        }
      })
    })
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Add user Successfull",
      }
    }).catch(err => {
      res.json({
        code: 0,
        info: {
          message: err,
        }
      })
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
});
router.get('/getAllUsers', (req, res) => {
  userModel.getAll()
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
});
router.post('/getUsersById', (req, res) => {
  userModel.getById(req.body.id)
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
router.get('/getCustomers', (req, res) => {
  userModel.getCustomers()
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
router.get('/getEmployees', (req, res) => {
  userModel.getEmployees()
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
router.put('/users', (req, res) => {
  userModel.updateUsers(req.body).then(data => {
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Update Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})

router.put('/updateUserStatus', (req, res) => {
  userModel.getByIdForAdmin(req.body.id).then(user => {
    let curStt = user[0].status;
    curStt = Number.parseInt(curStt);
    console.log("CUr stt: " + curStt);
    if (curStt === 1) curStt = 0;
    else curStt = 1;
    userModel.changeUserStatus(req.body.id, curStt).then(data => {
      res.json({
        code: 1,
        info: {
          message: 'Change status to ' + curStt,
          data,
        }
      })
    }).catch(err => {
      res.json({
        code: 0,
        info: {
          message: err,
        }
      })
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})

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
router.post('/getProductById', (req, res) => {
  productModel.getProductsById(req.body.id)
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
router.post('/getProductByCategory', (req, res) => {
  productModel.getProductsByCategory(req.body.id_category)
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

router.post('/getProductByQuery', (req, res) => {
  productModel.getProductsByQuery(req.body.searchStr)
    .then(data => {
      console.log(req.body.searchStr);
      console.log(data);
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
router.post('/addProducts', (req, res) => {
  productModel.addProduct(req.body).then(data => {
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Add Success",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.put('/products', (req, res) => {
  productModel.updateProduct(req.body).then(data => {
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Update Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.put('/deleteProducts', (req, res) => {
  productModel.deleteProduct(req.body.id).then(data => {

    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Delete Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.get('/getCategories', (req, res) => {
  categoryModel.getAll()
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
router.post('/categories', (req, res) => {
  categoryModel.addcategory(req.body).then(data => {
    console.log('data:', data);
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Add Success",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.put('/categories', (req, res) => {
  categoryModel.updateCategories(req.body).then(data => {
    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Update Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.put('/deleteCategories', (req, res) => {
  categoryModel.deleteCategories(req.body.id).then(data => {

    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Delete Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.get('/getAllInvoices', (req, res) => {
  invoiceModel.getAllInvoices()
    .then(productsList => {
      let list = _.groupBy(productsList, "id");
      // res.json(list);
      var final = [];
      _.forEach(list, (value, key) => {
        const products = _.map(value, item => {
          const { id_produc, name, productName, thenPrice, curPrice, id_category, categoryName, dial, address, password } = item;
          return { id_produc, name, productName, thenPrice, curPrice, id_category, categoryName, dial, address, password };
        })
        const temp = {
          id_invoice: value[0].id,
          id_customer: value[0].id_customer,
          createDate: value[0].createDate,
          deliveryDate: value[0].estimatedDeliveryDate,
          email: value[0].email,
          password: value[0].password,
          dial: value[0].dial,
          address: value[0].address,
          status: value[0].status,
          total: value[0].total,
          products,
        }
        final.push(temp);
      })
      res.json({
        code: 1,
        info: {
          final,
          message: "1",
        }
      })
    }).catch(err => {
      res.json({
        code: 0,
        info: {
          message: "0",
          err
        }
      })
    })
})
router.post('/getInvoiceDetails', (req, res) => {
  let id = req.body.id_customer;
  invoiceModel.getInvoiceDetails(id).then(productsList => {
    let list = _.groupBy(productsList, "id");
    // res.json(list);
    var final = [];
    _.forEach(list, (value, key) => {
      const products = _.map(value, item => {
        const { id_produc, name, productName, thenPrice, curPrice, id_category, categoryName } = item;
        return { id_produc, name, productName, thenPrice, curPrice, id_category, categoryName };
      })
      const temp = {
        id_invoice: value[0].id,
        id_customer: value[0].id_customer,
        createDate: value[0].createDate,
        deliveryDate: value[0].estimatedDeliveryDate,
        email: value[0].email,
        status: value[0].status,
        total: value[0].total,
        products,
      }
      final.push(temp);
    })
    res.json({
      code: 1,
      info: {
        final,
        message: "1",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "0",
        err
      }
    })
  })
})


router.post('/bankingCard', (req, res) => {
  bankingCardModel.getByUser(req.body.id).then(data => {
    res.json({
      code: 1,
      info: {
        message: "1",
        data,
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "0",
        err,
      }
    })
  })
})

router.put('/bankingCard', (req, res) => {
  let { id_user, cardNum, cardType } = req.body;

  bankingCardModel.editCard(id_user, cardNum, cardType).then(data => {
    res.json({
      code: 1,
      info: {
        message: "editted",
        data,
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "failed",
        err,
      }
    })
  })
})

router.post('/addInvoice', (req, res) => {
  let productsList = req.body.productsList;
  let id_customer = req.body.id_customer;
  invoiceModel.createBlankInvoice(id_customer).then(invoice => {
    let id_invoice = invoice.insertId;
    let sum = 0;
    console.log(productsList);
    for (let i of productsList) {
      sum += (i.quantity * i.singlePrice);
    }
    console.log(sum);
    invoiceModel.createInvoiceDetails(id_invoice, productsList).then(details => {
      invoiceModel.updateInvoiceTotalPrice(id_invoice, sum).then(updated => {
        res.json({
          code: 1,
          info: {
            message: "1",
          }
        })
      }).catch(err => {
        res.json({
          code: 0,
          info: {
            message: "01",
            err,
          }
        })
      })
    }).catch(err => {
      res.json({
        code: 0,
        info: {
          message: "02",
          err,
        }
      })
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "03",
        err,
      }
    })
  })
})
router.put('/invoices', (req, res) => {
  let { id_user, cardNum, cardType } = req.body;

  invoiceModel.updateInvoices(invoice).then(data => {
    res.json({
      code: 1,
      info: {
        message: "editted",
        data,
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "failed",
        err,
      }
    })
  })
})
router.put('/deleteInvoices', (req, res) => {
  invoiceModel.deleteInvoices(req.body.id).then(data => {

    res.json({
      code: 1,
      info: {
        data: req.body,
        message: "Delete Successfull",
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: err,
      }
    })
  })
})
router.post('/getBankingCard', (req, res) => {
  bankingCardModel.getByUser(req.body.id).then(data => {
    res.json({
      code: 1,
      info: {
        message: "1",
        data,
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "0",
        err,
      }
    })
  })
})

router.put('/bankingCard', (req, res) => {
  let { id_user, cardNum, cardType } = req.body;

  bankingCardModel.editCard(id_user, cardNum, cardType).then(data => {
    res.json({
      code: 1,
      info: {
        message: "editted",
        data,
      }
    })
  }).catch(err => {
    res.json({
      code: 0,
      info: {
        message: "failed",
        err,
      }
    })
  })
})



module.exports = router;
