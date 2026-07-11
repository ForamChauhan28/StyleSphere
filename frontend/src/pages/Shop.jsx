import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const mockProducts = [
  // Men
  { id: 1, name: 'Vintage Denim Jacket', price: 89.99, category: 'men', img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Classic White Sneakers', price: 79.99, category: 'men', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop' },
  { id: 5, name: 'Casual Linen Shirt', price: 45.00, category: 'men', img: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6858a?q=80&w=2000&auto=format&fit=crop' },
  
  // Women
  { id: 3, name: 'Summer Floral Dress', price: 59.99, category: 'women', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, name: 'Elegant Evening Gown', price: 120.00, category: 'women', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop' },
  { id: 6, name: 'Leather Crossbody Bag', price: 65.99, category: 'women', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop' },
  
  // Kids
  { id: 7, name: 'Kids Striped T-Shirt', price: 25.00, category: 'kids', img: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=2070&auto=format&fit=crop' },
  { id: 8, name: 'Toddler Denim Overalls', price: 35.00, category: 'kids', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2000&auto=format&fit=crop' },
];

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    let filtered = mockProducts;
    
    if (category && ['men', 'women', 'kids'].includes(category)) {
      setActiveCategory(category);
      filtered = filtered.filter(p => p.category === category);
    } else {
      setActiveCategory('all');
    }

    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setActiveCategory('search');
    }

    setProducts(filtered);
  }, [location.search]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Simulate auth requirement
    alert('Please sign in to add items to your cart.');
    navigate('/login');
  };

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-black text-primary shadow-lg">
                    ${product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-textMain mb-4 h-14 line-clamp-2">{product.name}</h3>
                  <button 
                    onClick={handleAddToCart}
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
