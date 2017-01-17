'use strict'
const request = require('supertest-as-promised')
const {expect, assert} = require('chai')
const db = require('APP/db')
const Review = require('APP/db/models/Review')
const Product = require('APP/db/models/Product')
const User = require('APP/db/models/User')
const app = require('./start')

let harry, draco, nimbus2000, numbus2001, firebolt;
let harryReviewsFirebolt, dracoReviewsFirebolt, dracoReviewsNimbus2000;

describe('/api/reviews', () => {
  before(() => {
    let foo = Promise.all([
      User.create({
          name: 'Harry Potter',
          email: 'hpotter@hogwarts.edu',
          password: 'seeker123'
        })
        .then(user => {
          harry = user;
          console.log("harry is ", harry);
        }),
      User.create({
          name: 'Draco Malfoy',
          email: 'dmalfoy@hogwarts.edu',
          password: 'killpotter'
        })
        .then(user => {
          draco = user;
        }),
      Product.create({
          name: 'Nimbus 2000',
          description: 'A fine starter broom.',
          price: 249.99,
          quantity: 100,
          photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
      })
      .then(product => {
        nimbus2000 = product;
      }),
      Product.create(  {
          name: 'Nimbus 2001',
          description: 'Moving up a bit.',
          price: 349.99,
          quantity: 100,
          photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
      })
      .then(product => {
        nimbus2001 = product;
      }),
      Product.create({
          name: 'Firebolt',
          description: 'For the intermediate quidditch player.',
          price: 500.99,
          quantity: 100,
          photoURL: 'http://vignette3.wikia.nocookie.net/harrypotter/images/7/74/Firebolt.jpg/revision/latest?cb=20141122220040'
      })
      .then(product => {
        firebolt = product;
        console.log("product returned for firebolt is", product);
      }),
      Review.create({
          content: 'Fantastic broom. I seek, I score.',
          rating: 5,
      })
      .then(review => {
        harryReviewsFirebolt = review;
      }),
      Review.create({
        content: 'I wish I had one. Perhaps my father can buy me one.',
        rating: 4
      })
      .then(review => {
        dracoReviewsFirebolt = review;
      })
    ]);
    console.log("harry: ", harry);
    console.log("draco: ", draco);
    return foo
    .then(() => {
      let goo = Promise.all([
        harryReviewsFirebolt.setReviewer(harry),
        dracoReviewsFirebolt.setReviewer(draco),
        firebolt.setReview(harryReviewsFirebolt),
        firebolt.setReview(dracoReviewsFirebolt)
      ])
      return goo;
    })
    .then(done);
  });

/*
  after(() => {
      return Promise.all([
        Product.destroy({
        where: {}
      }),
        User.destroy({
        where: {}
      }),
      ,
        Review.destroy({
        where: {}
      })
      ])
    });
    */
  })

  it('gets all reviews for a product by id', (done) => {
      request(app)
        .get(`/api/reviews/${firebolt.id}`)
        .expect(200)
        .expect((res) => {
          console.log("got back", res);
          assert.lengthOf(res.body, 2);
          let review1 = res.body[0];
          let review2 = res.body[1];
          assert.equal(review1.reviewer_id, harry.id);
          assert.equal(review1.produt_id, firebolt.id);
          assert.equal(review2.reviewer_id, draco.id);
          assert.equal(review2.product_id, firebolt.id);
        })
        .end(done);
  });
