import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success since MongoDB is blocked
    localStorage.setItem('user', JSON.stringify({ name: 'User' }));
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl -bottom-10 -right-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass z-10 p-10 rounded-3xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your StyleSphere account</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-secondary rounded border-gray-300" />
              <label className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            <a href="#" className="text-sm font-bold text-secondary hover:text-yellow-600">Forgot password?</a>
          </div>

          <button className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-gray-400/50">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="font-bold text-secondary hover:text-yellow-600">Sign up now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
