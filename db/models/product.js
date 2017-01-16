'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Category = require('./category');
const Review = require('./review');

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
    getProductWithAverageReview: function(productId) {
      
      const calculateAverageReview = reviews => {
        if (reviews) {
          const averageReview = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
          return Math.round(averageReview);
        }
        return null;
      };
      
      return this.findById(productId, {
        include: [Review]
      })
      .then(product => product.get({plain: true}))
      .then(product => {
        product.averageReview = calculateAverageReview(product.reviews);
        return product;
      });
    }
  }
});

module.exports = Product;