const Product = require('../models/Product');

const getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product == null) {
        return res.json({ message: 'Cannot find Product' });
      }
      res.product = product;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  }

module.exports = getProduct; 