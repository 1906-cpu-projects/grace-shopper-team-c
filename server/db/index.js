const db = require('./database');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');

// Associations go here
Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

LineItem.belongsTo(Product);
Product.hasMany(LineItem);

module.exports = {
  db,
  User,
  Product,
  Order,
  LineItem
};
