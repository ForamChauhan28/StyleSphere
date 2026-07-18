import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') || '';
    const name = formData.get('name') || 'User';
    const isAdmin = email.toLowerCase().includes('admin');
    
    localStorage.setItem('user', JSON.stringify({ 
      name, 
      email, 
      isAdmin 
    }));
    window.location.href = '/';
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

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-sm text-orange-800">
          <strong className="block mb-1 text-orange-950 font-bold">Admin Account Tip:</strong>
          To sign up as an administrator, enter an email address containing <code className="bg-orange-100 px-1.5 py-0.5 rounded font-mono text-orange-950">admin</code> (e.g. <code className="bg-orange-100 px-1.5 py-0.5 rounded font-mono text-orange-950">admin@stylesphere.com</code>).
        </div>

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
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-gray-400/50 mt-4">
            Sign Up
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
