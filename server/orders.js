const express = require('express');
const router = express.Router();

const db = require('APP/db');
const Order = db.model('order');
const Product = db.model('product');
const OrderProducts = db.model('orderProducts');

router.post('/', function(req, res, next) {
  Order.create(req.body)
  .then(() => res.sendStatus(201)) // OB/DYS: consider sending the order as data
  .catch(next)
});

router.param('orderId', (req, res, next, orderId) => {
  Order.findById(orderId) // OB/DYS: could use `include` to "join" with products
  .then(order => {
    // OB/DYS: also handle not finding an order
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
  // OB/DYS: unfinished
});

// OB/DYS: watch out for "verbs" in your URL
// OB/DYS: more standard POST /api/orders/:orderId/products/:productId {amount: 10}
// OB/DYS: OR POST /api/orders/:orderId/products {productId: 1, amount: 10}
router.post('/addProduct/:orderId/:productId', (req, res, next) => {
  OrderProducts.create({
    order_id: req.params.orderId,
    product_id: req.params.productId
  })
  .then(() => res.sendStatus(201))
  .catch(next);
});

// OB/DYS: watch out for "verbs" in URL
// OB/DYS: more standard DELETE /api/orders/:orderId/products/:productId
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