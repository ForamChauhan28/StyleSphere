import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">StyleSphere</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Elevating your style with futuristic 3D designs and timeless fashion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors font-bold">FB</a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors font-bold">TW</a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors font-bold">IG</a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors font-bold">YT</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=men" className="text-gray-400 hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?category=women" className="text-gray-400 hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=kids" className="text-gray-400 hover:text-white transition-colors">Kids' Collection</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} StyleSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
