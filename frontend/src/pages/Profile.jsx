import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"User"}');

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 md:p-16 text-center max-w-2xl mx-auto"
        >
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-lg">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-500 mb-8">Manage your account and view your recent orders.</p>

          <div className="bg-white/50 rounded-2xl p-8 text-left space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-700">Account Details</h3>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Email: user@example.com</p>
            </div>
            
            <hr className="border-gray-200" />
            
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Recent Orders</h3>
              <p className="text-gray-500 italic">You have no recent orders.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
