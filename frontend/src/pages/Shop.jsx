import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Subcategory classifier
  const getSubcategory = (p) => {
    const name = p.name.toLowerCase();
    if (name.includes('saree')) return 'saree';
    if (name.includes('jacket') || name.includes('hoodie')) return 'jackets & hoodies';
    if (name.includes('sneakers') || name.includes('shoes')) return 'shoes';
    if (name.includes('shirt') || name.includes('blouse')) return 'shirts & tops';
    if (name.includes('jeans') || name.includes('chinos') || name.includes('overalls')) return 'trousers & denim';
    if (name.includes('dress') || name.includes('gown')) return 'dresses & gowns';
    if (name.includes('watch')) return 'watches';
    if (name.includes('makeup') || name.includes('lipstick')) return 'beauty';
    if (name.includes('bag')) return 'bags';
    return 'other';
  };

  // Get available subcategories dynamically for the current category filter
  const getAvailableSubcategories = () => {
    const subsSet = new Set(
      allProducts
        .filter(p => activeCategory === 'all' || p.category === activeCategory)
        .map(p => getSubcategory(p))
    );
    subsSet.delete('other');
    return ['all', ...Array.from(subsSet)];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/admin/products');
        setAllProducts(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    const subcategory = params.get('subcategory');
    
    let filtered = [...allProducts];
    let currentCategory = 'all';
    
    if (category && ['men', 'women', 'kids'].includes(category)) {
      currentCategory = category;
      filtered = filtered.filter(p => p.category === category);
    }
    
    setActiveCategory(currentCategory);

    if (search) {
      const searchTerms = search.toLowerCase().split(' ');
      filtered = filtered.filter(p => {
        const searchText = `${p.name} ${p.category} ${p.description}`.toLowerCase();
        return searchTerms.some(term => {
          return searchText.includes(term) ||
                 (term.endsWith('es') && searchText.includes(term.slice(0, -2))) ||
                 (term.endsWith('s') && searchText.includes(term.slice(0, -1)));
        });
      });
      setActiveCategory('search');
    }

    if (subcategory) {
      setSelectedSubcategory(subcategory);
      filtered = filtered.filter(p => getSubcategory(p) === subcategory);
    } else {
      setSelectedSubcategory('all');
    }

    setProducts(filtered);
  }, [location.search, allProducts]);

  const handleSubcategoryClick = (sub) => {
    const params = new URLSearchParams(location.search);
    if (sub === 'all') {
      params.delete('subcategory');
    } else {
      params.set('subcategory', sub);
    }
    navigate(`/shop?${params.toString()}`);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast('Item added to cart!');
  };

  const availableSubcategories = getAvailableSubcategories();

  return (
    <div className="pt-8 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h1 className="text-5xl font-extrabold text-primary mb-3">
              {activeCategory === 'search' ? 'Search Results' : activeCategory === 'all' ? 'All Collections' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}'s Collection`}
            </h1>
            <p className="text-gray-500 text-lg">
              {activeCategory === 'search' ? `Showing results for your search` : `Discover the best styles curated just for you.`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {['all', 'men', 'women', 'kids'].map(cat => (
              <Link 
                key={cat}
                to={cat === 'all' ? '/shop' : `/shop?category=${cat}`}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeCategory === cat ? 'bg-secondary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        {!loading && activeCategory !== 'search' && availableSubcategories.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide border-b border-gray-100/50">
            <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mr-2 select-none">Filters:</span>
            {availableSubcategories.map(sub => (
              <button
                key={sub}
                onClick={() => handleSubcategoryClick(sub)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all border ${
                  selectedSubcategory === sub
                    ? 'bg-primary text-white border-primary shadow-lg shadow-gray-900/10'
                    : 'bg-white/50 backdrop-blur-md text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-white/80'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20 text-xl font-medium">Loading products...</div>
          ) : products.map((product, index) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.03, 
                rotateY: 2, 
                rotateX: -2,
                transition: { duration: 0.2 } 
              }}
              className="glass rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform-gpu cursor-pointer"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-black text-primary shadow-lg">
                    ₹{product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-textMain mb-4 h-14 line-clamp-2">{product.name}</h3>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-xl font-medium">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
