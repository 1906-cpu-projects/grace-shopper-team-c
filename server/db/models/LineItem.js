const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require('../database');

const LineItem = db.define('lineItem', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = LineItem;
