'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('order', {
  address: Sequelize.STRING,
  totalPrice: Sequelize.INTEGER
}); 

module.exports = Order;