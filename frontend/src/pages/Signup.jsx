import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const password = formData.get('password') || '';
    const confirmPassword = formData.get('confirmPassword') || '';

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API}/api/signup`, { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-24">
      <div className="absolute w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl -top-10 -right-10"></div>
      <div className="absolute w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl -bottom-10 -left-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass z-10 p-10 rounded-3xl w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight">Create Account</h1>
          <p className="text-gray-600 mt-2">Join StyleSphere today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input 
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-gray-400/50 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-bold text-secondary hover:text-yellow-600">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
