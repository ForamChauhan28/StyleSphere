const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const DATA_FILE = path.join(__dirname, 'products.json');

const initialProducts = [
  // MEN
  { _id: '1', name: 'Vintage Denim Jacket', price: 7469, category: 'men', image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop', description: "Experience timeless fashion with this premium vintage denim jacket.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Black','White'] },
  { _id: '2', name: 'Classic White Sneakers', price: 6639, category: 'men', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop', description: "Step into comfort with our classic white sneakers.", stock: 10, sizes: ['S','M','L','XL'], colors: ['White'] },
  { _id: '5', name: 'Casual Linen Shirt', price: 3735, category: 'men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000&auto=format&fit=crop', description: "Stay cool and stylish this summer with our casual linen shirt.", stock: 10, sizes: ['S','M','L','XL'], colors: ['White','Blue'] },
  { _id: '9', name: 'Urban Street Hoodie', price: 4149, category: 'men', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop', description: "Embrace the urban lifestyle with this comfortable street hoodie.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Black','Gray'] },
  { _id: '10', name: 'Tailored Fit Chinos', price: 4565, category: 'men', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop', description: "Versatile tailored fit chinos for the office or weekend.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Beige','Navy'] },
  { _id: '19', name: 'Graphic Print T-Shirt', price: 1499, category: 'men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop', description: "A comfortable, everyday graphic t-shirt made with 100% breathable cotton.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Black','White'] },
  { _id: '20', name: 'Running Sports Shoes', price: 4999, category: 'men', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop', description: "Lightweight and breathable running shoes built for performance.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Red','Black'] },
  { _id: '24', name: 'Leather Formal Shoes', price: 6499, category: 'men', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop', description: "Premium handcrafted leather formal shoes for men.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Brown','Black'] },
  { _id: '27', name: 'Plain Basic T-Shirts (Combo)', price: 1999, category: 'men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop', description: "Essential plain basic t-shirts. Includes black, white, and grey.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Black','White','Gray'] },

  // WOMEN
  { _id: '3', name: 'Summer Floral Dress', price: 4979, category: 'women', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop', description: "Radiate summer vibes with this beautiful floral dress.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Pink','White'] },
  { _id: '4', name: 'Elegant Evening Gown', price: 9960, category: 'women', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop', description: "Turn heads at any event with this elegant evening gown.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Red','Black'] },
  { _id: '6', name: 'Leather Crossbody Bag', price: 5477, category: 'women', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop', description: "A compact yet spacious leather crossbody bag.", stock: 10, sizes: ['Free Size'], colors: ['Brown','Black'] },
  { _id: '11', name: 'High-Waist Jeans', price: 6225, category: 'women', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2000&auto=format&fit=crop', description: "Flattering high-waist jeans with stretchable, durable denim.", stock: 10, sizes: ['S','M','L','XL'], colors: ['Blue','Black'] },
  { _id: '12', name: 'Silk Blouse', price: 7055, category: 'women', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=2000&auto=format&fit=crop', description: "A luxurious silk blouse that adds sophistication to any outfit.", stock: 10, sizes: ['S','M','L','XL'], colors: ['White','Pink'] },
  { _id: '15', name: 'Premium Makeup Palette', price: 3817, category: 'women', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop', description: "Complete your look with our premium makeup palette.", stock: 10, sizes: ['Free Size'], colors: [] },
  { _id: '17', name: 'Elegant Silk Saree', price: 8999, category: 'women', image: 'https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=2000&auto=format&fit=crop', description: "A beautifully crafted traditional silk saree.", stock: 10, sizes: ['Free Size'], colors: ['Red','Green','Blue'] },
  { _id: '21', name: 'Designer Party Wear Saree', price: 15499, category: 'women', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2000&auto=format&fit=crop', description: "Make a statement with this heavily embroidered designer saree.", stock: 10, sizes: ['Free Size'], colors: ['Red','Gold'] },
  { _id: '25', name: 'Women Casual Sneakers', price: 3999, category: 'women', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop', description: "Trendy, comfortable, and versatile casual sneakers.", stock: 10, sizes: ['S','M','L','XL'], colors: ['White','Pink'] },

  // KIDS
  { _id: '7', name: 'Kids Striped T-Shirt', price: 2075, category: 'kids', image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=2070&auto=format&fit=crop', description: "A fun and playful striped t-shirt for kids.", stock: 10, sizes: ['S','M','L'], colors: ['Blue','Red'] },
  { _id: '8', name: 'Toddler Denim Overalls', price: 2905, category: 'kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2000&auto=format&fit=crop', description: "Cute and durable denim overalls for toddlers.", stock: 10, sizes: ['XS','S','M'], colors: ['Blue'] },
  { _id: '13', name: 'Kids Winter Jacket', price: 4565, category: 'kids', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop', description: "Keep them warm and cozy with this insulated winter jacket.", stock: 10, sizes: ['S','M','L'], colors: ['Red','Blue'] },
  { _id: '14', name: 'Colorful Sneakers', price: 2490, category: 'kids', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2000&auto=format&fit=crop', description: "Vibrant and comfortable sneakers for active kids.", stock: 10, sizes: ['S','M','L'], colors: ['Red','Blue','Green'] },
  { _id: '23', name: 'Kids Cartoon T-Shirts', price: 2199, category: 'kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=2000&auto=format&fit=crop', description: "Fun cartoon print t-shirts made with ultra-soft organic cotton.", stock: 10, sizes: ['S','M','L'], colors: ['White','Yellow'] },
  { _id: '28', name: 'Kids Puffer Vest', price: 3100, category: 'kids', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=2000&auto=format&fit=crop', description: "A stylish puffer vest to keep the little ones warm.", stock: 10, sizes: ['S','M','L'], colors: ['Navy','Red'] },
  { _id: '29', name: 'Summer Shorts Set', price: 1800, category: 'kids', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?q=80&w=2000&auto=format&fit=crop', description: "Comfortable summer shorts set for active sunny days.", stock: 10, sizes: ['S','M','L'], colors: ['Blue','Green'] },
  { _id: '30', name: 'Girls Sparkle Dress', price: 4200, category: 'kids', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2000&auto=format&fit=crop', description: "A magical sparkle dress for birthday parties and festive occasions.", stock: 10, sizes: ['S','M','L'], colors: ['Pink','Purple'] },

  // ACCESSORIES
  { _id: '18', name: 'Classic Chronograph Watch', price: 12499, category: 'accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop', description: "A sophisticated chronograph watch with a leather strap.", stock: 10, sizes: ['Free Size'], colors: ['Brown','Black'] },
  { _id: '22', name: 'Smart Fitness Watch', price: 7999, category: 'accessories', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2000&auto=format&fit=crop', description: "Track your health with this smart fitness watch.", stock: 10, sizes: ['Free Size'], colors: ['Black','Blue'] },
  { _id: '26', name: 'Luxury Rose Gold Watch', price: 18999, category: 'accessories', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop', description: "A stunning luxury rose gold watch with minimalist dial.", stock: 10, sizes: ['Free Size'], colors: ['Rose Gold'] },
];

class ProductStore {
  constructor() {
    this.products = [];
    this.loadFromDisk();
  }

  isDBConnected() {
    return mongoose.connection.readyState === 1;
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        this.products = JSON.parse(raw);
      } else {
        this.products = [...initialProducts];
        this.saveToDisk();
      }
    } catch (err) {
      console.error('Error loading products from disk:', err);
      this.products = [...initialProducts];
    }
  }

  saveToDisk() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.products, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving products to disk:', err);
    }
  }

  async getAllProducts() {
    if (this.isDBConnected()) {
      try {
        const dbProducts = await Product.find().lean();
        if (dbProducts && dbProducts.length > 0) {
          return dbProducts;
        }
      } catch (err) {
        console.warn('Error fetching from MongoDB, falling back to local store:', err.message);
      }
    }
    return this.products;
  }

  async getProductById(id) {
    if (this.isDBConnected()) {
      try {
        const dbProduct = await Product.findById(id).lean();
        if (dbProduct) return dbProduct;
      } catch (err) {
        // ID might not be a valid MongoDB ObjectId or DB offline
      }
    }
    return this.products.find(p => String(p._id) === String(id)) || null;
  }

  async createProduct(data) {
    let newProduct = { ...data };

    // Generate valid id if not provided
    if (!newProduct._id) {
      newProduct._id = new mongoose.Types.ObjectId().toString();
    }

    // Default values
    newProduct.stock = newProduct.stock !== undefined ? Number(newProduct.stock) : 10;
    newProduct.price = Number(newProduct.price) || 0;
    newProduct.sizes = Array.isArray(newProduct.sizes) ? newProduct.sizes : [];
    newProduct.colors = Array.isArray(newProduct.colors) ? newProduct.colors : [];
    newProduct.createdAt = new Date().toISOString();
    newProduct.updatedAt = new Date().toISOString();

    // If MongoDB is connected, save to DB
    if (this.isDBConnected()) {
      try {
        const mongoProduct = new Product(newProduct);
        const saved = await mongoProduct.save();
        newProduct = saved.toObject();
      } catch (err) {
        console.warn('Could not save product to MongoDB directly, keeping in local store:', err.message);
      }
    }

    // Always add to local in-memory & file store so it is immediately available
    this.products.unshift(newProduct);
    this.saveToDisk();

    console.log(`✅ Product created successfully: "${newProduct.name}" (ID: ${newProduct._id})`);
    return newProduct;
  }

  async updateProduct(id, data) {
    let updated = null;

    if (this.isDBConnected()) {
      try {
        const dbUpdated = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
        if (dbUpdated) updated = dbUpdated;
      } catch (err) {
        console.warn('MongoDB update failed, updating local store:', err.message);
      }
    }

    const idx = this.products.findIndex(p => String(p._id) === String(id));
    if (idx !== -1) {
      this.products[idx] = {
        ...this.products[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = this.products[idx];
      this.saveToDisk();
    }

    return updated || data;
  }

  async deleteProduct(id) {
    if (this.isDBConnected()) {
      try {
        await Product.findByIdAndDelete(id);
      } catch (err) {
        console.warn('MongoDB delete failed:', err.message);
      }
    }

    this.products = this.products.filter(p => String(p._id) !== String(id));
    this.saveToDisk();
    return true;
  }

  getProductsCount() {
    return this.products.length;
  }
}

module.exports = new ProductStore();
