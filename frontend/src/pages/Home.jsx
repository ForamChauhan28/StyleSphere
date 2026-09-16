import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const containerRef = useRef();

  useGSAP(() => {
    if (trendingProducts.length > 0) {
      gsap.fromTo('.product-card', 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trending-section',
            start: 'top 75%',
          }
        }
      );
    }
  }, { dependencies: [trendingProducts], scope: containerRef });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast('Item added to cart!');
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('/api/products');
        // Select a subset of products for trending section (e.g., first 4)
        setTrendingProducts(res.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching trending products:', err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[600px] flex items-center justify-center overflow-hidden pb-16">
        <Hero3D />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-dark p-12 rounded-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              New Fashion <br/> <span className="text-secondary">Collection 2026</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the latest trends in clothing, blending futuristic 3D aesthetics with timeless style.
            </p>
            <Link to="/shop" className="inline-block pointer-events-auto bg-secondary hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Products */}
      <section ref={containerRef} className="trending-section py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Trending Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div 
                key={product._id}
                whileHover={{ 
                  scale: 1.03, 
                  rotateY: 2, 
                  rotateX: -2,
                  transition: { duration: 0.2 } 
                }}
                className="product-card opacity-0 glass rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform-gpu cursor-pointer"
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
        </div>
      </section>
    </div>
  );
};

export default Home;
