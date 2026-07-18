const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Read and parse products from frontend src/data/products.js
let mockProducts = [];
try {
  const productsFilePath = path.join(__dirname, '../frontend/src/data/products.js');
  const productsFileContent = fs.readFileSync(productsFilePath, 'utf8');

  // Convert ES6 export to CommonJS
  let jsCode = productsFileContent
    .replace(/export const products =/g, 'const products =')
    .replace(/export const trendingProducts =/g, 'const trendingProducts =');

  jsCode += '\nmodule.exports = { products };';

  const tempFilePath = path.join(__dirname, 'temp_products.js');
  fs.writeFileSync(tempFilePath, jsCode);

  const { products } = require(tempFilePath);
  fs.unlinkSync(tempFilePath);

  // Map products to schema
  mockProducts = products.map(p => ({
    _id: new mongoose.Types.ObjectId(p.id.toString(16).padStart(24, '0')),
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.img || p.image,
    images: p.images && p.images.length > 0 ? p.images : [p.img || p.image],
    description: p.description || `Experience timeless fashion with this premium ${p.name}. Featuring durable stitching and a classic fit, it's the perfect addition to any modern wardrobe.`,
    stock: p.stock || 10,
    sizes: p.sizes || ['S', 'M', 'L', 'XL'],
    colors: p.colors || ['Black', 'White', 'Amber']
  }));
  
  console.log(`Successfully parsed ${mockProducts.length} products from frontend`);
} catch (err) {
  console.error('Error parsing frontend products file:', err);
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas for seeding');
    
    // Clear existing products to prevent duplicates during testing
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert mock products
    await Product.insertMany(mockProducts);
    console.log(`Successfully seeded ${mockProducts.length} products`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting/seeding to MongoDB:', err);
    process.exit(1);
  });
