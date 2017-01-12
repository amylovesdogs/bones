const express = require('express');
const router = express.Router();
const db = require('APP/db');
const Category = db.model('categories');

router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
});

router.get('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
  .then(category => res.json(category))
  .catch(next);
});

router.get('/:categoryId/products', (req, res, next) => {
  Category.findById(req.params.categoryId)
  .then(category => category.getProducts())
  .then(products => res.json(products))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next);
}); 

router.put('/:categoryId', (req, res, next) => {
  // OB/DYS: no changes ever submitted?
  Category.update({
    where: {
      id: req.params.categoryId
    }
  })
  .then(category => res.json(category))
  .catch(next)
})

module.exports = router;