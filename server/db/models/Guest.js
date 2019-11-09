const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const db = require('../database');

const Guest = db.define('guest', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
});

module.exports = Guest
