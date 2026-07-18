import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const [user, setUser] = useState({ name: 'User', email: 'user@example.com' });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const { addToast } = useToast();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        name: storedUser.name || 'User',
        email: storedUser.email || 'user@example.com'
      });
    }
  }, []);

  const handleEditClick = () => {
    setEditForm({ name: user.name, email: user.email });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      addToast('Name and email are required.', 'error');
      return;
    }
    const updatedUser = { ...user, name: editForm.name, email: editForm.email };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="pt-8 min-h-screen bg-background pb-20">
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700">Account Details</h3>
                {!isEditing && (
                  <button onClick={handleEditClick} className="flex items-center gap-1 text-sm text-secondary font-bold hover:underline">
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleSave}
                      className="flex-1 bg-secondary text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors shadow-md"
                    >
                      <Save size={18} /> Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600"><span className="font-semibold text-gray-800">Name:</span> {user.name}</p>
                  <p className="text-gray-600"><span className="font-semibold text-gray-800">Email:</span> {user.email}</p>
                </div>
              )}
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
