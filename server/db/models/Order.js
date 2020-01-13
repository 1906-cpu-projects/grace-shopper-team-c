const Sequelize = require('sequelize');
const { UUID, UUIDV4, BOOLEAN } = Sequelize;
const db = require('../database');

const Order = db.define('order', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  complete: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Order;
