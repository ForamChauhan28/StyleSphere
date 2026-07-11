import React from 'react';
import { motion } from 'framer-motion';

const Cart = () => {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-primary mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop" 
                  alt="Item" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold text-primary">Vintage Denim Jacket</h3>
                  <p className="text-gray-500">Size: M | Color: Black</p>
                  <p className="text-secondary font-bold text-lg mt-1">$89.99</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-4">
                <button className="text-red-500 font-bold hover:text-red-700">Remove</button>
                <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
                  <button className="w-8 h-8 flex items-center justify-center font-bold text-primary hover:text-secondary">-</button>
                  <span className="font-bold">1</span>
                  <button className="w-8 h-8 flex items-center justify-center font-bold text-primary hover:text-secondary">+</button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-8 rounded-3xl text-white"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="font-bold">$89.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="border-t border-gray-600 pt-4 flex justify-between">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold text-secondary">$89.99</span>
                </div>
              </div>
              <button className="w-full bg-secondary hover:bg-yellow-500 text-white font-bold py-4 rounded-full transition-colors">
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
