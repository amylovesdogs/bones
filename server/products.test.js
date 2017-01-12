'use strict'
const request = require('supertest-as-promised')
const {expect, assert} = require('chai')
const db = require('APP/db')
const Product = require('APP/db/models/product')
const app = require('./start')

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
  }
]

let products;

describe('/api/products', (done) => {

  before(() => {
    return Product.bulkCreate(productsData, {returning: true})
    .then(foundProducts => {
      products = foundProducts;
    })
    .then(done);
  });

  after(() => {
    return Product.destroy({
      where: {}
    });
  })

  it('gets all products', (done) => {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect((res) => {
          assert.lengthOf(res.body, 2);
        })
        .end(done);
  });

  it('gets a single product by id', (done) => {
      request(app)
        .get(`/api/products/${products[0].id}`)
        .expect(200)
        .expect((res) => {
          let product = res.body;
          assert.equal(product.name, products[0].name);
        })
        .end(done);
  });

  it('posts a product and adds to database', (done) => {
      request(app)
        .post('/api/products')
        .send({
          name: 'Nimbus 2002',
          description: 'blah2',
          price: 349.99,
          quantity: 100,
          photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
        })
        .expect(201)
        .expect((res) => {
          Product.find({
            where: {
              name: 'Nimbus 2002'
            }
          })
          .then(product => {
            expect(product).to.not.be.null;
            assert.equal(product.name, 'Nimbus 2002');
          })
        })
        .end(done);
  })

  it('puts a product and updates in database', (done) => {
      request(app)
        .put(`/api/products/${products[0].id}`)
        .send({
          name: 'Nimbus 2003'
        })
        .expect(204)
        .expect((res) => {
          Product.find({
            where: {
              name: 'Nimbus 2003'
            }
          })
          .then(product => {
            expect(product).to.not.be.null;
            assert.equal(product.name, 'Nimbus 2003');         
          })
        })
        .end(done);
  })

})