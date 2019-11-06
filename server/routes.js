const express = require('express');
const router = express.Router();
const { User, Product, Order, LineItem } = require('./db');

router.use(express.json());

router.use(require('express-session')({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
}));

//GET Route
router.get('/api/users', (req, res, next) => {
  User.findAll({
    include: [{ model: Order, include: [LineItem] }]
  })
    .then(user => res.send(user))
    .catch(next);
});
router.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next);
});

// Create a User
router.post('/api/users', (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.send(user))
    .catch(next);
});
// Update a User
router.put('/api/users/:id', async (req, res, next) => {
  const user = await User.findByPk(req.session.user.id);

  user
    .update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(next);
});
// Delete a User
router.delete('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

// Login
router.post('/api/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (!user) {
        throw { status: 401 };
      }
      req.session.user = user;
      return res.send(user);
    })
    .catch(err => next(err));
});

router.get('/api/session', (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

router.delete('/api/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

//Order
router.get('/api/orders', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

router.post('/api/orders', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201).send(order))
    .catch(next);
});
//update order from uncomplete to complete
router.put('/api/orders/:id', async (req, res, next) => {
  try {
    let instance = await Order.findByPk(req.params.id);
    instance = Object.assign(instance, req.body);
    await instance.save();
    res.send(instance);
  } catch (ex) {
    next(ex);
  }
});

//LineItem
router.get('/api/lineItems', (req, res, next) => {
  LineItem.findAll()
    .then(items => res.send(items))
    .catch(next);
});

router.post('/api/lineItems', (req, res, next) => {
  LineItem.create(req.body)
    .then(item => res.status(201).send(item))
    .catch(next);
});
//update the quantity
router.put('/api/lineItems/:id', async (req, res, next) => {
  try {
    let instance = await LineItems.findByPk(req.params.id);
    instance = Object.assign(instance, req.body);
    await instance.save();
    res.send(instance);
  } catch (ex) {
    next(ex);
  }
});

router.delete('/api/lineItems/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(item => item.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
module.exports = router;
