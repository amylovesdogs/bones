'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const OrderProducts = db.define('orderProducts', { // OB/DYS: postgres is a little weird about camel casing
  price: Sequelize.DOUBLE
});

module.exports = OrderProducts;