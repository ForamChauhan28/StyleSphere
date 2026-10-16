const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Offer = require('../models/Offer');

const DATA_FILE = path.join(__dirname, 'offers.json');

const initialOffers = [
  { _id: 'offer1', title: 'Summer Sale', description: 'Up to 50% off on summer collection', discountPercent: 50, isActive: true, code: 'SUMMER50' },
  { _id: 'offer2', title: 'New User Welcome', description: 'Get 20% off on your first order', discountPercent: 20, isActive: true, code: 'WELCOME20' },
];

class OfferStore {
  constructor() {
    this.offers = [];
    this.loadFromDisk();
  }

  isDBConnected() {
    return mongoose.connection.readyState === 1;
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        this.offers = JSON.parse(raw);
      } else {
        this.offers = [...initialOffers];
        this.saveToDisk();
      }
    } catch (err) {
      console.error('Error loading offers from disk:', err);
      this.offers = [...initialOffers];
    }
  }

  saveToDisk() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.offers, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving offers to disk:', err);
    }
  }

  async getAllOffers() {
    if (this.isDBConnected()) {
      try {
        const dbOffers = await Offer.find().lean();
        if (dbOffers && dbOffers.length > 0) return dbOffers;
      } catch (err) {
        console.warn('MongoDB offers read error, falling back:', err.message);
      }
    }
    return this.offers;
  }

  async createOffer(data) {
    let newOffer = { ...data };
    if (!newOffer._id) {
      newOffer._id = new mongoose.Types.ObjectId().toString();
    }
    if (this.isDBConnected()) {
      try {
        const mongoOffer = new Offer(newOffer);
        const saved = await mongoOffer.save();
        newOffer = saved.toObject();
      } catch (err) {
        console.warn('Could not save offer to MongoDB directly:', err.message);
      }
    }
    this.offers.unshift(newOffer);
    this.saveToDisk();
    return newOffer;
  }

  async updateOffer(id, data) {
    let updated = null;
    if (this.isDBConnected()) {
      try {
        const dbUpdated = await Offer.findByIdAndUpdate(id, data, { new: true }).lean();
        if (dbUpdated) updated = dbUpdated;
      } catch (err) {
        console.warn('MongoDB update failed:', err.message);
      }
    }
    const idx = this.offers.findIndex(o => String(o._id) === String(id));
    if (idx !== -1) {
      this.offers[idx] = { ...this.offers[idx], ...data };
      if (!updated) updated = this.offers[idx];
      this.saveToDisk();
    }
    return updated || data;
  }

  async deleteOffer(id) {
    if (this.isDBConnected()) {
      try {
        await Offer.findByIdAndDelete(id);
      } catch (err) {
        console.warn('MongoDB delete failed:', err.message);
      }
    }
    this.offers = this.offers.filter(o => String(o._id) !== String(id));
    this.saveToDisk();
    return true;
  }

  getActiveOffersCount() {
    return this.offers.filter(o => o.isActive).length;
  }
}

module.exports = new OfferStore();
