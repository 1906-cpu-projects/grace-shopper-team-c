const Sequelize = require('sequelize');
const { UUID, UUIDV4, INTEGER, DataTypes,STRING, TEXT } = Sequelize;
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
  },
  imageURL: {
    type: STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
  },
  description: TEXT
});

module.exports = Product;
