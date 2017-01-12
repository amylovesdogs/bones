'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Category = db.define('categories', {
	name: Sequelize.STRING // OB/DYS: consider unique validator here
});

module.exports = Category;