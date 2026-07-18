import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      addToast("Your cart is empty!", 'error');
      return;
    }
    addToast("Checkout successful! Thank you for your purchase.", 'success');
    clearCart();
    navigate('/');
  };

  const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
  const total = getCartTotal() + shipping;

  return (
    <div className="pt-8 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-primary mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="glass p-12 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty.</h2>
                <Link to="/shop" className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={`${item._id || item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center space-x-6 w-full sm:w-auto">
                      <Link to={`/product/${item._id || item.id}`}>
                        <img 
                          src={item.image || item.img} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-xl hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item._id || item.id}`}>
                          <h3 className="text-xl font-bold text-primary hover:text-secondary transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-gray-500">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-secondary font-bold text-lg mt-1">₹{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                      <button 
                        onClick={() => removeFromCart(item._id || item.id, item.size, item.color)}
                        className="text-red-500 font-bold hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-primary hover:text-secondary transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-primary hover:text-secondary transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-8 rounded-3xl text-white sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="font-bold">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-600 pt-4 flex justify-between">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold text-secondary">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full font-bold py-4 rounded-full transition-colors ${
                  cartItems.length === 0 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-secondary hover:bg-yellow-500 text-white'
                }`}
              >
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
