const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4, DataTypes} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/grace_shopper_db');

const User = conn.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  }
})

const Product = conn.define('product', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    validate: {
      isDecimal: true
    }
  }
});

Product.belongsTo(User)
User.hasMany(Product);

const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const users = [
    {
      name: 'Billy Hill', email: 'bHill@gmail.com', password: '12345'
    },
    {
      name: 'John Ford', email: 'jFord@gmail.com', password: '12345'
    },
    {
      name: 'Anna Lane', email: 'aLane@gmail.com', password: '12345'
    },
    {
      name: 'May Taylor', email: 'mTaylor@gmail.com', password: '12345'
    },
    {
      name: 'James Romero', email: 'jRomero@gmail.com', password: '12345'
    }
  ]
  const [billy, john, anna, may, james] = await Promise.all(users.map(user => User.create(user)))

  const products = [
    {name: 'Hammer', price: 25.99},
    {name: 'Nails', price: 9.50},
    {name: 'Paint', price: 4.50},
    {name: 'Chair Set', price: 157.47},
    {name: 'Shovel', price: 15.00},
    {name: 'Lawn Mower', price: 300.25},
    {name: 'Wrench', price: 13.99}
  ]
  const [hammer, nails, paint, chairSet, shovel, lawnMower, wrench] = await Promise.all(products.map(product => Product.create(product)))

  return {
    users: {
      billy,
      john,
      anna,
      may,
      james
    },
    products: {
      hammer,
      nails,
      paint,
      chairSet,
      shovel,
      lawnMower,
      wrench
    }
  }

}

// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    User,
    Product
  }
}
