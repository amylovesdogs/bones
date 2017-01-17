'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = db.define('reviews', {
  content: {
  	type: Sequelize.TEXT,
		validate: {
			len: [20,5000],
		},
  	allowNull: false
  },
	rating: {
  	type: Sequelize.INTEGER,
		validate: {
      max: 5,
      min: 1
		},
  	allowNull: false
  },
});

module.exports = Review;