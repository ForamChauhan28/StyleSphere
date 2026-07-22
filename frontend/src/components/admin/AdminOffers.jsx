import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/admin/offers');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await axios.delete(`/api/admin/offers/${id}`);
        fetchOffers();
      } catch (error) {
        console.error('Error deleting offer:', error);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
     try {
       await axios.put(`/api/admin/offers/${id}`, { isActive: !currentStatus });
       fetchOffers();
     } catch (error) {
       console.error('Error toggling offer status:', error);
     }
  };

  if (loading) return <div className="text-center py-10">Loading offers...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-primary">Manage Offers</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage promotional campaigns and discounts.</p>
        </div>
        <button className="bg-primary hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-gray-400/50">
          <Plus size={18} />
          <span className="font-bold">New Offer</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Valid Until</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {offers.map((offer) => (
                <tr key={offer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary">{offer.title}</p>
                      <p className="text-xs text-gray-500">{offer.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">{offer.discountPercentage}% OFF</td>
                  <td className="px-6 py-4 text-gray-600">
                    {offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'No expiry'}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(offer._id, offer.isActive)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${offer.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(offer._id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {offers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No active offers. Create one to boost sales!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOffers;
