const Sequelize = require('sequelize');
const { UUID, UUIDV4, INTEGER, DataTypes,STRING } = Sequelize;
const db = require('../database');

const Product = db.define('product', {
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
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      isDecimal: true
    }
  },
  stock: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Product;
