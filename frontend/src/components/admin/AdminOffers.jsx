import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyOffer = {
  title: '',
  description: '',
  discountPercentage: '',
  isActive: true,
  validUntil: '',
};

// Offer Form Modal
const OfferFormModal = ({ isOpen, onClose, offer, onSave }) => {
  const [formData, setFormData] = useState(emptyOffer);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (offer) {
      setFormData({
        ...emptyOffer,
        ...offer,
        validUntil: offer.validUntil ? new Date(offer.validUntil).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData(emptyOffer);
    }
    setError('');
  }, [offer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'discountPercentage' ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (!formData.title || !formData.description || !formData.discountPercentage) {
        setError('Please fill in all required fields.');
        setSaving(false);
        return;
      }
      const payload = { ...formData };
      if (!payload.validUntil) delete payload.validUntil;
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save offer.');
    } finally {
      setSaving(false);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-primary">
              {offer ? 'Edit Offer' : 'Create New Offer'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Offer Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Summer Clearance Sale"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Describe the offer..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Discount (%) *</label>
                <input
                  name="discountPercentage"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 20"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Valid Until</label>
                <input
                  name="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                id="isActive"
                className="w-4 h-4 accent-secondary rounded"
              />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-700">Active (visible to customers)</label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-primary hover:bg-gray-800 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-gray-400/30 disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : (offer ? 'Update Offer' : 'Create Offer')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

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

  const handleSave = async (formData) => {
    if (editingOffer) {
      await axios.put(`/api/admin/offers/${editingOffer._id}`, formData);
    } else {
      await axios.post('/api/admin/offers', formData);
    }
    fetchOffers();
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

  const openAddModal = () => {
    setEditingOffer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-10">Loading offers...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-primary">Manage Offers</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage promotional campaigns and discounts.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-gray-400/50"
        >
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
                    <button onClick={() => openEditModal(offer)} className="text-blue-500 hover:text-blue-700 p-2" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(offer._id)} className="text-red-500 hover:text-red-700 p-2" title="Delete">
                      <Trash2 size={18} />
                    </button>
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

      <OfferFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={editingOffer}
        onSave={handleSave}
      />
    </motion.div>
  );
};

export default AdminOffers;
