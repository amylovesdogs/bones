'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Category = require('./category');

const Product = db.define('products', {
  name: {
    // OB/DYS: consider unique validator
  	type: Sequelize.STRING,
  	allowNull: false
  },
  description: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },
  price: {
  	type: Sequelize.FLOAT,
  	allowNull: false
  },
  quantity: {
    // OB/DYS: min/max validations
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
  photoURL: {
    // OB/DYS: sequelize comes with isUrl validator
  	type: Sequelize.STRING,
  	defaultValue: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  }
},{
	defaultScope: {
		include: [{
			model: Category
		}]
	}
});

module.exports = Product;