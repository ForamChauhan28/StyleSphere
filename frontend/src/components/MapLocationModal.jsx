import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Search, Navigation } from 'lucide-react';

const MapLocationModal = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('New York, NY 10001');
  const [isPinning, setIsPinning] = useState(false);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-primary/60 backdrop-blur-sm" 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl h-[70vh] bg-background rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10 relative shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
                <MapPin className="text-secondary" size={26} /> Delivery Location
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-11/12 max-w-md z-20">
             <div className="relative shadow-lg rounded-full overflow-hidden border border-gray-200">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search size={18} className="text-gray-400" />
               </div>
               <input 
                 type="text" 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 className="block w-full pl-11 pr-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                 placeholder="Search address or zip code..."
               />
             </div>
          </div>

          {/* Mock Map Body */}
          <div className="flex-1 relative bg-[#e5e3df] overflow-hidden group cursor-crosshair" onClick={() => setIsPinning(true)}>
            {/* Simulated Map Background Image or Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
            
            {/* Grid overlay to look more like a map */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Simulated Map Pin */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 drop-shadow-2xl flex flex-col items-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: isPinning ? -10 : 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg mb-1 whitespace-nowrap">
                {address}
              </div>
              <MapPin size={48} className="text-secondary fill-secondary/20" />
              {/* Pulse effect */}
              <span className="absolute bottom-0 flex h-4 w-4 -mb-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
              </span>
            </motion.div>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
               <button className="bg-white p-3 rounded-xl shadow-md text-gray-700 hover:text-primary transition-colors">
                 <Navigation size={20} />
               </button>
               <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                 <button className="p-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 font-bold text-lg leading-none">+</button>
                 <button className="p-3 text-gray-700 hover:bg-gray-50 font-bold text-lg leading-none">-</button>
               </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white p-4 border-t border-gray-100 flex justify-end gap-3 z-10">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2"
            >
              Confirm Location
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default MapLocationModal;
