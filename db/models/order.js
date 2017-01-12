'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('order', {
  address: Sequelize.STRING
}); 

module.exports = Order;