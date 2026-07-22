import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import OrdersModal from './OrdersModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    };
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const megaMenuData = {
    men: {
      title: "Men's Collection",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop",
      tagline: "Spotlight on CLASSIC TAILORING",
      columns: [
        {
          title: "CLOTHING",
          items: [
            { label: "All Clothing", link: "/shop?category=men" },
            { label: "T-Shirts & Tops", link: "/shop?category=men&subcategory=shirts%20%26%20tops" },
            { label: "Jackets & Hoodies", link: "/shop?category=men&subcategory=jackets%20%26%20hoodies" },
            { label: "Trousers & Denim", link: "/shop?category=men&subcategory=trousers%20%26%20denim" },
            { label: "Shoes & Sneakers", link: "/shop?category=men&subcategory=shoes" },
          ]
        },
        {
          title: "DISCOVER",
          items: [
            { label: "New Arrivals", link: "/shop?category=men" },
            { label: "Trending Now", link: "/shop?category=men" },
            { label: "Retro Sportswear", link: "/shop?category=men" },
            { label: "Wardrobe Organizer", link: "/wardrobe" }
          ]
        }
      ]
    },
    women: {
      title: "Women's Collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      tagline: "Spotlight on PARTY GLAMOUR",
      columns: [
        {
          title: "CLOTHING",
          items: [
            { label: "All Clothing", link: "/shop?category=women" },
            { label: "Dresses & Gowns", link: "/shop?category=women&subcategory=dresses%20%26%20gowns" },
            { label: "Sarees & Ethnic", link: "/shop?category=women&subcategory=saree" },
            { label: "Shirts & Tops", link: "/shop?category=women&subcategory=shirts%20%26%20tops" },
            { label: "Trousers & Denim", link: "/shop?category=women&subcategory=trousers%20%26%20denim" },
            { label: "Bags & Purses", link: "/shop?category=women&subcategory=bags" },
            { label: "Beauty & Makeup", link: "/shop?category=women&subcategory=beauty" },
            { label: "Luxury Watches", link: "/shop?category=women&subcategory=watches" }
          ]
        },
        {
          title: "DISCOVER",
          items: [
            { label: "New Season Designs", link: "/shop?category=women" },
            { label: "Ethnic Collection", link: "/shop?category=women" },
            { label: "Glamour Looks", link: "/shop?category=women" },
            { label: "Wardrobe Organizer", link: "/wardrobe" }
          ]
        }
      ]
    },
    kids: {
      title: "Kids' Collection",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=2000&auto=format&fit=crop",
      tagline: "Spotlight on ACTIVE PLAY",
      columns: [
        {
          title: "CLOTHING",
          items: [
            { label: "All Clothing", link: "/shop?category=kids" },
            { label: "T-Shirts", link: "/shop?category=kids&subcategory=shirts%20%26%20tops" },
            { label: "Overalls", link: "/shop?category=kids&subcategory=trousers%20%26%20denim" },
            { label: "Jackets", link: "/shop?category=kids&subcategory=jackets%20%26%20hoodies" },
            { label: "Sneakers", link: "/shop?category=kids&subcategory=shoes" }
          ]
        },
        {
          title: "DISCOVER",
          items: [
            { label: "School Wear Specials", link: "/shop?category=kids" },
            { label: "Cartoon Print Collection", link: "/shop?category=kids" },
            { label: "Eco-Soft Cotton Pack", link: "/shop?category=kids" }
          ]
        }
      ]
    }
  };
  
  const trendingSearches = ['shoes', 't shirts', 'watches', 'sarees'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 glass border-b border-gray-100/50">
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
          
          <div className="hidden md:flex items-center space-x-8 h-full">
            <Link to="/" className="text-textMain hover:text-secondary transition-colors font-medium">Home</Link>
            <Link to="/shop" className="text-textMain hover:text-secondary transition-colors font-medium">Shop</Link>
            
            {/* Men Mega Menu Wrapper */}
            <div 
              className="py-5 h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('men')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link to="/shop?category=men" className={`text-textMain hover:text-secondary transition-colors font-medium ${activeMegaMenu === 'men' ? 'text-secondary' : ''}`}>
                Men
              </Link>
            </div>

            {/* Women Mega Menu Wrapper */}
            <div 
              className="py-5 h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('women')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link to="/shop?category=women" className={`text-textMain hover:text-secondary transition-colors font-medium ${activeMegaMenu === 'women' ? 'text-secondary' : ''}`}>
                Women
              </Link>
            </div>

            {/* Kids Mega Menu Wrapper */}
            <div 
              className="py-5 h-full flex items-center cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('kids')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link to="/shop?category=kids" className={`text-textMain hover:text-secondary transition-colors font-medium ${activeMegaMenu === 'kids' ? 'text-secondary' : ''}`}>
                Kids
              </Link>
            </div>

            <Link to="/wardrobe" className="text-textMain hover:text-secondary transition-colors font-medium">Wardrobe Organizer</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative flex items-center">
              {isSearchOpen && (
                <div className="relative">
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    type="text"
                    placeholder="Search for Products, Brands and More"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="pl-4 pr-10 py-1.5 rounded-sm border border-gray-300 focus:outline-none focus:border-secondary shadow-sm text-sm"
                    autoFocus
                  />
                  
                  <AnimatePresence>
                    {isSearchFocused && !searchQuery && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-b-md shadow-lg py-2 z-50"
                      >
                        <p className="px-4 py-1 text-xs text-gray-500 font-semibold mb-1">Trending</p>
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              setSearchQuery(term);
                              navigate(`/shop?search=${encodeURIComponent(term)}`);
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700"
                          >
                            <Search size={14} className="text-gray-400" />
                            {term}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <button 
                type={isSearchOpen ? "submit" : "button"}
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                className={`text-textMain hover:text-secondary transition-colors ${isSearchOpen ? 'absolute right-3 z-10' : ''}`}
              >
                <Search size={20} />
              </button>
            </form>
            {/* Account Dropdown */}
            {user ? (
              <div className="relative group">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="flex items-center gap-2 border border-gray-200 rounded-full py-1.5 px-3 hover:bg-white/50 transition-colors bg-white/30 backdrop-blur-md"
                >
                  <div className="w-6 h-6 bg-[#d4815a] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.avatar || user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className="text-gray-600" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50 border border-gray-100/50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                          {user.name}
                        </p>
                      </div>
                      <div className="py-1 border-b border-gray-100">
                        <Link to="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f6f2ee] transition-colors">
                          Dashboard
                        </Link>
                        <button 
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsOrdersModalOpen(true);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f6f2ee] transition-colors flex items-center gap-2"
                        >
                          <Package size={16} /> Returns & Orders
                        </button>
                        <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f6f2ee] transition-colors bg-[#f1ebe3]">
                          Account
                        </Link>
                        {user.isAdmin && (
                          <Link to="/admin" className="block px-4 py-2.5 text-sm text-orange-600 font-bold hover:bg-orange-50 transition-colors">
                            Admin Panel
                          </Link>
                        )}
                      </div>
                      <div className="py-1">
                        <button 
                          onClick={() => { 
                            localStorage.removeItem('user'); 
                            window.dispatchEvent(new Event('auth-change'));
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f6f2ee] transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors"
              >
                Sign In
              </button>
            )}
            <Link to="/cart" className="text-textMain hover:text-secondary transition-colors relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-textMain">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
            className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl z-40 py-10 px-8"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              {megaMenuData[activeMegaMenu].columns.map((col, idx) => (
                <div key={idx} className="space-y-4 text-left">
                  <h4 className="font-extrabold text-sm text-primary tracking-wider uppercase">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link 
                          to={item.link} 
                          className="text-gray-600 hover:text-secondary hover:translate-x-1 transition-all inline-block text-[15px] font-semibold"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div></div>

              <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white text-left">
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={megaMenuData[activeMegaMenu].image} 
                    alt={megaMenuData[activeMegaMenu].title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-primary text-sm mb-1">{megaMenuData[activeMegaMenu].tagline}</h4>
                  <p className="text-gray-500 text-xs mb-4">Discover the best styles curated just for you.</p>
                  <Link 
                    to={`/shop?category=${activeMegaMenu}`}
                    className="text-xs font-black text-secondary hover:text-primary transition-colors flex items-center gap-1 group/btn"
                    onClick={() => setActiveMegaMenu(null)}
                  >
                    Shop Now <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {user ? (
              <>
                <button 
                  onClick={() => { setIsOpen(false); setIsOrdersModalOpen(true); }}
                  className="w-full text-left px-3 py-2 text-textMain hover:bg-gray-100 rounded-md"
                >
                  Returns & Orders
                </button>
                <button 
                  onClick={() => { 
                    localStorage.removeItem('user'); 
                    window.dispatchEvent(new Event('auth-change'));
                  }}
                  className="w-full text-left px-3 py-2 text-textMain hover:bg-gray-100 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => { setIsOpen(false); setIsAuthModalOpen(true); }}
                className="w-full text-left px-3 py-2 text-textMain hover:bg-gray-100 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <OrdersModal isOpen={isOrdersModalOpen} onClose={() => setIsOrdersModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
