import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, UploadCloud, Image as ImageIcon, CheckCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VisualSearchModal = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        simulateScanning();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const simulateScanning = () => {
    setIsScanning(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      onClose(); // Close modal
      navigate('/shop?visual_search=true'); // Redirect to shop with special param
      setImagePreview(null);
    }, 3000);
  };

  const handleReset = () => {
    setImagePreview(null);
    setIsScanning(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-slate-800 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Camera size={22} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Visual Search</h3>
                  <p className="text-xs text-gray-300">Shop this look</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                disabled={isScanning}
                className="text-gray-300 hover:text-white transition-colors bg-white/10 p-2 rounded-full disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8">
              {!imagePreview ? (
                <div 
                  className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all ${
                    isDragging ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <UploadCloud size={40} className="text-primary/40" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">Drag & Drop Image</h4>
                  <p className="text-gray-500 text-sm mb-6 max-w-[250px]">
                    Upload a screenshot or photo of an outfit you like, and we'll find similar items.
                  </p>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <ImageIcon size={18} />
                    Browse Files
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center" style={{ height: '350px' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain p-2 opacity-80"
                  />
                  
                  {isScanning && (
                    <>
                      {/* Scanning Overlay Effects */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full mb-4 shadow-lg"
                        />
                        <p className="text-white font-bold text-lg tracking-wide drop-shadow-md flex items-center gap-2">
                          <Search size={20} />
                          Analyzing Style...
                        </p>
                        <p className="text-white/80 text-sm mt-1 font-medium">Finding visually similar products</p>
                      </div>

                      {/* Scanning Line Animation */}
                      <motion.div
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatType: "reverse" }}
                        className="absolute left-0 right-0 h-1 bg-secondary shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20"
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {imagePreview && !isScanning && (
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
                 <button 
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-800 font-semibold px-4 py-2 transition-colors text-sm"
                  >
                    Cancel
                  </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VisualSearchModal;
