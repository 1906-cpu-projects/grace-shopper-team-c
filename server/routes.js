const express = require('express');
const router = express.Router();
const db = require('../db')
const { User, Product } = db.models;

router.use(express.json())

//GET Route
router.get('/api/users', (req, res, next)=>{
  User.findAll()
    .then(user => res.send(user))
    .catch(next)
})
router.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

// Create a user
router.post('/api/users', (req, res, next)=>{
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})
// Update a user
router.put('/api/users/:id', async(req, res, next)=> {
  const user = await User.findByPk(req.session.user.id);

  user.update(req.body)
    .then( updatedUser => res.status(200).send(updatedUser))
    .catch(next);
})

// Login
router.post('/api/login', (req, res ,next) => {
  User.findOne({ where: {
    email: req.body.email,
    password: req.body.password
  }})
  .then( user => {
    if(!user) {
      throw({ status: 401 })
    }

    req.session.user = user;
    return res.send(user);
  })
  .catch(err => next(err));
})

router.get('/api/session', (req, res, next) => {
  const user = req.session.user
  if(user) {
    return res.send(user)
  }
  next({ status: 401 })
})

router.delete('/api/logout', (req, res, next) => {
  req.session.destroy()
  res.sendStatus(204);
})

module.exports = router;
