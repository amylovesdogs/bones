const express = require('express');
const router = express.Router();
const db = require('APP/db');
const Product = db.model('product');

router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => res.json(products))
  .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
  .then(product => res.json(product))
  .catch(next);
});

router.get('/categories/:category', (req, res, next) => {
  Product.find({
    where: req.params.category
  })
  .then(products => res.send(products))
  .catch(next);
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  Product.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next);
}); 

module.exports = router;