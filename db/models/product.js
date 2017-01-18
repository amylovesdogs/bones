'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Category = require('./category');
const Review = require('./review');
const User = require('./user');

const Product = db.define('products', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false,
    unique: true
  },
  description: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },
  price: {
  	type: Sequelize.INTEGER,
  	allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
  	type: Sequelize.INTEGER,
  	allowNull: false,
    validate: {
      min: 0,
      max: 999
    }
  },
  photoURL: {
  	type: Sequelize.STRING,
  	defaultValue: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    validate: {
      isUrl: true
    }
  }
},{
	defaultScope: {
		include: [{
			model: Category
		}]
	},
  classMethods: {
    calculateAverageReview: function(reviews) {
      if (reviews) {
        const averageReview = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
        return Math.round(averageReview);
      }
      return null;
    },
    getProductWithAverageReview: function(productId) {
      return this.findById(productId, {
        include: [{model: Review, include: [{model: User, as: 'Reviewer'}]}]
      })
      .then(product => product.get({plain: true}))
      .then(product => {
        product.averageReview = this.calculateAverageReview(product.reviews);
        return product;
      });
    },
    getTrendingProducts: function() {
      return this.findAll({
        include: [{model: Review, include: [{model: User, as: 'Reviewer'}]}],
        order: [
          Sequelize.fn('RANDOM')
        ],
        limit: 3
      })
      .then(products => db.Promise.map(products, product => product.get({plain: true})))
      .then(products => {
        return products.map(product => {
          product.averageReview = this.calculateAverageReview(product.reviews);
          return product;
        });
      });
    }
  }
});

module.exports = Product;