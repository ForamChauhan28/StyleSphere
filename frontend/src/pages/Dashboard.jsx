import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const user = storedUser || { name: '23DCEO13 FORAM CHAUHAN' };

  return (
    <div className="pt-8 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-primary mb-4">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            This is your personal dashboard. Track your orders, view your wishlist, and manage your account settings here. We are currently building out this feature!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-2">Recent Orders</h3>
              <p className="text-gray-500 mb-4">You have no recent orders.</p>
              <Link to="/shop" className="text-primary font-bold hover:underline">Start Shopping →</Link>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-2">My Wardrobe</h3>
              <p className="text-gray-500 mb-4">Organize your favorite styles.</p>
              <Link to="/wardrobe" className="text-primary font-bold hover:underline">View Wardrobe →</Link>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-2">Account Settings</h3>
              <p className="text-gray-500 mb-4">Manage your personal details.</p>
              <Link to="/profile" className="text-primary font-bold hover:underline">Edit Profile →</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
