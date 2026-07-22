import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import { ShoppingCart, MapPin, Share2, Ruler, X, AlertCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Amber'];

  // Pincode State
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);

  // Size Guide State
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitPreference, setFitPreference] = useState('Regular');
  const [recommendedSize, setRecommendedSize] = useState(null);

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setDeliveryEstimate("Delivery by Thursday, COD Available");
    } else {
      setDeliveryEstimate("Please enter a valid 6-digit pincode.");
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this ${product.name} for ₹${product.price} at StyleSphere! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const calculateSize = () => {
    const h = parseInt(height);
    const w = parseInt(weight);
    if (!h || !w) return;
    
    let size = 'M';
    if (h > 180 || w > 85) size = 'XL';
    else if (h > 170 || w > 75) size = 'L';
    else if (h < 160 || w < 60) size = 'S';
    
    if (fitPreference === 'Tight' && size !== 'S') {
       if (size === 'M') size = 'S';
       if (size === 'L') size = 'M';
       if (size === 'XL') size = 'L';
    } else if (fitPreference === 'Loose' && size !== 'XL') {
       if (size === 'S') size = 'M';
       if (size === 'M') size = 'L';
       if (size === 'L') size = 'XL';
    }
    setRecommendedSize(size);
  };

  useEffect(() => {
    // Simulated Purchase Toast (FOMO)
    const timer = setTimeout(() => {
      addToast("Someone in New York just bought this!", "success");
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, addToast]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductAndRelated = async () => {
      try {
        const productRes = await axios.get(`/api/products/${id}`);
        const foundProduct = productRes.data;
        setProduct(foundProduct);
        setCurrentImage(foundProduct.image);

        const allProductsRes = await axios.get('/api/products');
        const related = allProductsRes.data
          .filter(p => p.category === foundProduct.category && p._id !== foundProduct._id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product or related items:', err);
        setProduct(null);
        setRelatedProducts([]);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 min-h-screen bg-background text-center">
        <h1 className="text-3xl font-bold text-primary">Product not found.</h1>
        <button onClick={() => navigate('/shop')} className="mt-6 bg-secondary text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-500">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    addToast('Item added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    navigate('/cart');
  };

  return (
    <div className="pt-8 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl overflow-hidden p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col w-full max-w-md mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden w-full"
              >
                <img 
                  src={currentImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </motion.div>
              
              {/* Thumbnails Gallery */}
              {product.images && product.images.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide justify-center"
                >
                  {product.images.map((imgUrl, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImage(imgUrl)}
                      className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${currentImage === imgUrl ? 'border-primary opacity-100 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={imgUrl} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-extrabold text-primary">{product.name}</h1>
                <button 
                  onClick={handleWhatsAppShare}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors tooltip"
                  title="Share to WhatsApp"
                >
                  <Share2 size={24} />
                </button>
              </div>
              <p className="text-3xl font-bold text-secondary mb-2">₹{product.price}</p>
              
              {/* Low Stock Indicator */}
              <div className="flex items-center gap-1 text-red-500 font-bold text-sm mb-6 bg-red-50 w-fit px-3 py-1 rounded-full border border-red-100">
                <AlertCircle size={14} className="animate-pulse" />
                <span>Only 2 left in size {selectedSize}!</span>
              </div>
              
              <p className="text-textMain mb-8 text-lg">
                {product.description || "Experience timeless fashion with this premium clothing item. Featuring durable stitching and a classic fit, it's the perfect addition to any modern wardrobe."}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-primary">Select Size</h3>
                  <button 
                    onClick={() => setIsSizeModalOpen(true)}
                    className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline"
                  >
                    <Ruler size={16} /> Find My Size
                  </button>
                </div>
                <div className="flex space-x-3">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                        selectedSize === size ? 'bg-primary text-white scale-110' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-3">Select Color</h3>
                <div className="flex space-x-3">
                  {colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-full font-bold transition-all ${
                        selectedColor === color ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pincode Checker */}
              <div className="mb-8 p-4 border border-gray-200 rounded-xl bg-white/50 shadow-sm">
                <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                  <MapPin size={16} /> Check Delivery & Services
                </h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Pincode (e.g. 100001)" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                  />
                  <button 
                    onClick={handleCheckPincode}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Check
                  </button>
                </div>
                {deliveryEstimate && (
                  <p className={`mt-2 text-sm font-medium ${pincode.length === 6 ? 'text-green-600' : 'text-red-500'}`}>
                    {deliveryEstimate}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg flex justify-center items-center gap-2"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary text-white py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-8">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct, index) => (
                <motion.div 
                  key={relProduct._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Link to={`/product/${relProduct._id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={relProduct.image} 
                        alt={relProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-textMain mb-1 truncate">{relProduct.name}</h3>
                      <span className="text-lg font-bold text-secondary">₹{relProduct.price}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Smart Size Guide Modal */}
      <AnimatePresence>
        {isSizeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsSizeModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-extrabold text-primary mb-2">Find My Size</h2>
              <p className="text-gray-500 mb-6 text-sm">Enter your details and our smart algorithm will recommend the perfect fit.</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="e.g. 175"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="e.g. 70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Fit Preference</label>
                  <div className="flex gap-2">
                    {['Tight', 'Regular', 'Loose'].map(fit => (
                      <button 
                        key={fit}
                        onClick={() => setFitPreference(fit)}
                        className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors border ${
                          fitPreference === fit ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={calculateSize}
                className="w-full bg-secondary text-white py-3 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors mb-4 shadow-lg"
              >
                Calculate Size
              </button>

              {recommendedSize && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
                >
                  <p className="text-green-800 font-medium">Your Recommended Size is</p>
                  <p className="text-4xl font-black text-green-600 mt-1">{recommendedSize}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
