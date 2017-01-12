'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const OrderProducts = db.define('orderProducts', { // OB/DYS: postgres is a little weird about camel casing
  price: Sequelize.DOUBLE // OB/DYS: can be integer
  // OB/DYS: maybe include quantity
});

module.exports = OrderProducts;