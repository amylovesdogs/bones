const express = require('express');
const router = express.Router();
const db = require('APP/db');
const Product = db.model('products');
const Categories = db.model('categories');

const Review = db.model('reviews');


router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => res.json(products))
  .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.getProductWithAverageReview(req.params.productId)
  .then(product => res.json(product))
  .catch(next);
});

router.get('/categories/:categoryId', (req, res, next) => {
  Product.findAll({
    include: [{
        model: Categories,
        where: {id: req.params.categoryId}
    }]
  })
  .then(products => res.json(products))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next);
});

router.put('/:productId', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.productId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})


module.exports = router;