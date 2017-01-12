const express = require('express');
const router = express.Router();

const db = require('APP/db');
const Order = db.model('order');
const Product = db.model('product');
const OrderProducts = db.model('orderProducts');

router.post('/', function(req, res, next) {
  Order.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next)
});

router.param('orderId', (req, res, next, orderId) => {
  Order.findById(orderId)
  .then(order => {
    req.order = order
    next();
  })
  .catch(next);
});

router.get('/:orderId', (req, res, next) =>  {
  res.json(req.order);
});

router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.orderId
    }
  });
});

router.post('/addProduct/:orderId/:productId', (req, res, next) => {
  OrderProducts.create({
    order_id: req.params.orderId,
    product_id: req.params.productId
  })
  .then(() => res.sendStatus(201))
  .catch(next);
});

router.delete('/removeProduct/:orderId/:productId', (req, res, next) => {
  OrderProducts.destroy({
    where: {
      order_id: req.params.orderId,
      product_id: req.params.productId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});


module.exports = router;