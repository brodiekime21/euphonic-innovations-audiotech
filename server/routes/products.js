const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const getProduct = require('../middleware/getProduct') ;
const isAuthenticated = require('../middleware/isAuthenticated')

const User = require('../models/User')

router.get('/browse-products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)

    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
});



module.exports = router;