import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Amber'];

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl overflow-hidden p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop" 
                alt="Product" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl font-extrabold text-primary mb-4">Vintage Denim Jacket</h1>
              <p className="text-3xl font-bold text-secondary mb-6">$89.99</p>
              
              <p className="text-textMain mb-8 text-lg">
                Experience timeless fashion with this premium vintage denim jacket. 
                Featuring durable stitching and a classic fit, it's the perfect addition to any modern wardrobe.
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary mb-3">Select Size</h3>
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

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-auto">
                <button 
                  onClick={() => { alert('Please log in to add items to your cart.'); navigate('/login'); }}
                  className="flex-1 bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => { alert('Please log in to proceed to checkout.'); navigate('/login'); }}
                  className="flex-1 bg-secondary text-white py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
