'use strict'
const request = require('supertest-as-promised')
const {expect, assert} = require('chai')
const db = require('APP/db')
const Category = require('APP/db/models/Category')
const Product = require('APP/db/models/Product')
const app = require('./start')

const categoriesData = [
  {
    name: 'broomsticks'
  },
  {
    name: 'wands'
  }
]

const productsData = [
  {
    name: 'Nimbus 2000',
    description: 'blah',
    price: 349.99,
    quantity: 100,
    photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
  },
  {
    name: 'Nimbus 2001',
    description: 'blah1',
    price: 349.99,
    quantity: 100,
    photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
  },
  {
    name: 'Bagel',
    description: 'blah2',
    price: 349.99,
    quantity: 100,
    photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
  }
]

const associationData = [
  {
    category_id: 1,
    product_id: 1
  },
  {
    category_id: 1,
    product_id: 2
  }
]

let categories, products;

describe('/api/categories', () => {

  before(() => {
    return Promise.all([
      Category.bulkCreate(categoriesData, {returning: true})
        .then(foundCategories => {
          categories = foundCategories;
        }),
      Product.bulkCreate(productsData, {returning: true})
      .then(foundProducts => {
        products = foundProducts;
      })
    ])
    .then(() => {
      return db.model('product_categories').bulkCreate(associationData);
    })
  });

  after(() => {
    return Category.destroy({
      where: {}
    }).then(() => {
      return Product.destroy({
        where: {}
      })
    });
  })

  it('gets all categories', (done) => {
      request(app)
        .get('/api/categories')
        .expect(200)
        .expect((res) => {
          assert.lengthOf(res.body, 2);
          let category1 = res.body[0];
          let category2 = res.body[1];
          assert.equal(category1.name, categories[0].name);
          assert.equal(category2.name, categories[1].name);
        })
        .end(done);
  });

  it('gets a single category by id', (done) => {
      request(app)
        .get(`/api/categories/${categories[0].id}`)
        .expect(200)
        .expect((res) => {
          let category = res.body;
          assert.equal(category.name, categories[0].name);
        })
        .end(done)
  });

  it('gets a all products for a given category', (done) => {
      request(app)
        .get(`/api/categories/${categories[0].id}/products`)
        .expect(200)
        .expect((res) => {
          assert.lengthOf(res.body, 2);
        })
        .end(done)
  });

  it('posts a category and adds to database', (done) => {
      request(app)
        .post('/api/categories')
        .send({
          name: 'Robes',
        })
        .expect(201)
        .expect((res) => {
          Category.find({
            where: {
              name: 'Robes'
            }
          })
          .then(category => {
            expect(category).to.not.be.null;
          })
        })
        .end(done)
  })

})