'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const OrderProducts = db.define('orderProducts', {
  price: Sequelize.DOUBLE
});

module.exports = OrderProducts;