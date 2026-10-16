const express = require('express');
const router = express.Router();
const productStore = require('../data/productStore');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await productStore.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await productStore.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
