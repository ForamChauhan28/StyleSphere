const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  validUntil: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
