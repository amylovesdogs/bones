'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('order', {
  address: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  email: {
  	type: Sequelize.STRING,
  	allowNull: false,
  	validate: {
  		isEmail: true
  	}
  },
  totalPrice: Sequelize.INTEGER
}, {
  instanceMethods: {
    calculateTotal: function(products) {
      this.totalPrice = products.reduce((total, product) => total + b.price, 0);
    }
  }
}); 

module.exports = Order;