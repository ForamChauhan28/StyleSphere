const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const productStore = require('../data/productStore');
const offerStore = require('../data/offerStore');

const isDBConnected = () => mongoose.connection.readyState === 1;

// Stats
router.get('/stats', async (req, res) => {
  try {
    let totalUsers = 0;
    if (isDBConnected()) {
      try {
        totalUsers = await User.countDocuments();
      } catch (e) {
        // DB offline fallback
      }
    }
    const totalProducts = productStore.getProductsCount();
    const activeOffers = offerStore.getActiveOffersCount();

    res.json({ totalProducts, totalUsers, activeOffers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Users
router.get('/users', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.json([]);
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/users/:id/admin', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ message: 'Database is currently unavailable. Please try again later.' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isAdmin = req.body.isAdmin;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ message: 'Database is currently unavailable. Please try again later.' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Products
router.get('/products', async (req, res) => {
  try {
    const products = await productStore.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await productStore.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    if (!req.body.name || req.body.price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const product = await productStore.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await productStore.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await productStore.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Offers
router.get('/offers', async (req, res) => {
  try {
    const offers = await offerStore.getAllOffers();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/offers', async (req, res) => {
  try {
    const offer = await offerStore.createOffer(req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/offers/:id', async (req, res) => {
  try {
    const offer = await offerStore.updateOffer(req.params.id, req.body);
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/offers/:id', async (req, res) => {
  try {
    await offerStore.deleteOffer(req.params.id);
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
