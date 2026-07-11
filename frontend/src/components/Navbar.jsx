import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-primary">StyleSphere</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-textMain hover:text-secondary transition-colors font-medium">Home</Link>
            <Link to="/shop" className="text-textMain hover:text-secondary transition-colors font-medium">Shop</Link>
            <Link to="/shop?category=men" className="text-textMain hover:text-secondary transition-colors font-medium">Men</Link>
            <Link to="/shop?category=women" className="text-textMain hover:text-secondary transition-colors font-medium">Women</Link>
            <Link to="/shop?category=kids" className="text-textMain hover:text-secondary transition-colors font-medium">Kids</Link>
            <Link to="/wardrobe" className="text-textMain hover:text-secondary transition-colors font-medium">Wardrobe Organizer</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative flex items-center">
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-sm absolute right-0"
                  autoFocus
                />
              )}
              <button 
                type={isSearchOpen ? "submit" : "button"}
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                className={`text-textMain hover:text-secondary transition-colors ${isSearchOpen ? 'absolute right-3 z-10' : ''}`}
              >
                <Search size={20} />
              </button>
            </form>
            {user ? (
              <div className="relative group cursor-pointer flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute right-0 top-8 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 hidden group-hover:block z-50 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-primary">{user.name}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                  <button 
                    onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-textMain hover:text-secondary transition-colors">
                <User size={20} />
              </Link>
            )}
            <Link to="/cart" className="text-textMain hover:text-secondary transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-textMain">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute w-full"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-textMain hover:bg-gray-100 rounded-md">Home</Link>
            <Link to="/shop" className="block px-3 py-2 text-textMain hover:bg-gray-100 rounded-md">Shop</Link>
            <Link to="/wardrobe" className="block px-3 py-2 text-textMain hover:bg-gray-100 rounded-md font-medium text-secondary">Wardrobe Organizer</Link>
            <Link to="/login" className="block px-3 py-2 text-textMain hover:bg-gray-100 rounded-md">Login</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
