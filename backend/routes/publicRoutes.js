const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const mongoose = require('mongoose');

// Mock data fallback if MongoDB is down
const mockProducts = [
  { _id: '1', name: 'Cyberpunk Sneaker', price: 120, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
  { _id: '2', name: 'Neon Street Jacket', price: 85, category: 'jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800' },
  { _id: '3', name: 'Techwear Hoodie', price: 65, category: 'hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
  { _id: '4', name: 'Gravity Boots', price: 150, category: 'shoes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
];

// Get all products
router.get('/products', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB disconnected. Returning mock products.");
      return res.json(mockProducts);
    }
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB disconnected. Returning mock product.");
      const mockProduct = mockProducts.find(p => p._id === req.params.id);
      if (!mockProduct) return res.status(404).json({ message: 'Mock Product not found' });
      return res.json(mockProduct);
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
