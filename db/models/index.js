'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
const Order = require('./order');

Order.belongsTo(User);
Order.belongsToMany(Product, {through: require('./orderProducts')});

module.exports = {User, Product};
