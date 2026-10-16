import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Save, Image, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyProduct = {
  name: '',
  category: 'men',
  price: '',
  description: '',
  image: '',
  images: [],
  stock: 10,
  sizes: [],
  colors: [],
};

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy', 'Gray', 'Brown', 'Pink', 'Yellow', 'Orange', 'Purple', 'Beige'];
const categoryOptions = ['men', 'women', 'kids'];

// Product Form Modal
const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const formRef = React.useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({ ...emptyProduct, ...product });
    } else {
      setFormData(emptyProduct);
    }
    setError('');
    if (isOpen && formRef.current) {
      formRef.current.scrollTop = 0;
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter(c => c !== color) : [...prev.colors, color],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (!formData.name || !formData.price || !formData.description || !formData.image) {
        setError('Please fill in all required fields (Name, Category, Price, Stock, Image URL, Description).');
        setSaving(false);
        return;
      }
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" data-lenis-prevent="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          data-lenis-prevent="true"
          className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-primary">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-xs text-gray-500">Product will appear instantly in the store & admin catalog</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4"
            style={{ overscrollBehavior: 'contain' }}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Classic White Sneakers"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all bg-white text-sm"
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹) *</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2999"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Stock *</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL *</label>
                <div className="flex gap-2">
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-9 h-9 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="Describe the product..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all resize-none text-sm"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Available Sizes</label>
              <div className="flex flex-wrap gap-1.5">
                {sizeOptions.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      formData.sizes.includes(size)
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Available Colors</label>
              <div className="flex flex-wrap gap-1.5">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      formData.colors.includes(color)
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-primary hover:bg-gray-800 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-gray-400/30 disabled:opacity-50 text-sm"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    if (editingProduct) {
      await axios.put(`/api/admin/products/${editingProduct._id}`, formData);
      setFeedback({ type: 'success', text: `Product "${formData.name}" updated successfully!` });
    } else {
      const res = await axios.post('/api/admin/products', formData);
      setFeedback({ type: 'success', text: `Product "${formData.name}" added on the spot! It is now live in both admin and store frontend.` });
    }
    await fetchProducts();
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/admin/products/${id}`);
        setFeedback({ type: 'success', text: 'Product deleted successfully.' });
        fetchProducts();
        setTimeout(() => setFeedback(null), 4000);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-10 font-medium text-gray-500">Loading products...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 font-semibold flex items-center justify-between shadow-sm"
        >
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="text-green-600 hover:text-green-800">
            <X size={18} />
          </button>
        </motion.div>
      )}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-primary">Manage Products</h2>
          <p className="text-gray-500 text-sm mt-1">Add, update, or remove products from your catalog.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-gray-400/50 cursor-pointer"
        >
          <Plus size={18} />
          <span className="font-bold">Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium text-primary">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-primary">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700 p-2" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 p-2" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No products found. Add some to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSave}
      />
    </motion.div>
  );
};

export default AdminProducts;
