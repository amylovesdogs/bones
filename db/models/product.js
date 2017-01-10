'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Product = db.define('product', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  quantity: Sequelize.INTEGER,
  category: Sequelize.STRING,
  photoURL: Sequelize.STRING
});

module.exports = Product;