const Sequelize = require('sequelize')
const db = require('../db')

const Company = db.define('company', {
  fractal_index: {
      type: Sequelize.FLOAT
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'createdAt',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updatedAt',
    defaultValue: Sequelize.NOW
  }
})

module.exports = Company;
