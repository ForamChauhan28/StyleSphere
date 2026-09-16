import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CheckCircle2, MapPin, Clock } from 'lucide-react';

const TrackPackageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const trackingSteps = [
    { id: 1, title: 'Order Placed', date: 'Oct 24, 2026', time: '10:00 AM', status: 'completed', icon: Package, location: 'StyleSphere HQ' },
    { id: 2, title: 'Shipped', date: 'Oct 25, 2026', time: '02:30 PM', status: 'completed', icon: Truck, location: 'New York Distribution Center' },
    { id: 3, title: 'Out for Delivery', date: 'Oct 27, 2026', time: '08:15 AM', status: 'completed', icon: MapPin, location: 'Local Courier' },
    { id: 4, title: 'Delivered', date: 'Oct 27, 2026', time: '01:45 PM', status: 'completed', icon: CheckCircle2, location: 'Front Desk / Reception' },
  ];

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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-gray-800 px-8 py-6 flex justify-between items-start text-white">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-3">
                <Package className="text-secondary" size={28} /> Track Package
              </h2>
              <p className="text-gray-300 mt-2 text-sm font-medium">Tracking Number: <span className="text-white tracking-wider">TRK-9824-7712</span></p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-8 bg-gray-50 flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                 <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=200&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-primary">Vintage Denim Jacket</h3>
                    <p className="text-gray-500 text-sm">Qty: 1 | Size: M | Color: Blue</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                       <CheckCircle2 size={14} /> Delivered
                    </div>
                 </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-4 left-[35px] w-0.5 bg-gray-200"></div>

                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === trackingSteps.length - 1;
                  
                  return (
                    <div key={step.id} className="relative flex items-start gap-6 mb-8 last:mb-0 group">
                      <div className="flex flex-col items-center z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-transform group-hover:scale-110 ${
                          step.status === 'completed' ? 'bg-secondary text-primary' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon size={20} />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className={`text-lg font-bold ${step.status === 'completed' ? 'text-primary' : 'text-gray-400'}`}>
                          {step.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">{step.location}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-400 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                          <Clock size={12} /> {step.date} - {step.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100">
             <button onClick={onClose} className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                Close Tracking
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default TrackPackageModal;
