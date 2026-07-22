import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Clock, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock past orders for the demonstration
  const mockOrders = [
    {
      id: "ORD-9824-7712",
      date: "Oct 24, 2026",
      status: "Delivered",
      total: 7469,
      items: [
        { name: "Vintage Denim Jacket", size: "M", color: "Blue", qty: 1, img: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      id: "ORD-3319-5501",
      date: "Oct 18, 2026",
      status: "Processing",
      total: 12499,
      items: [
        { name: "Classic Chronograph Watch", size: "One Size", color: "Silver", qty: 1, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop" }
      ]
    }
  ];

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-primary/40 backdrop-blur-md" 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-background rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
            <div>
              <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3">
                <Package className="text-secondary" size={32} /> Returns & Orders
              </h2>
              <p className="text-gray-500 mt-1">Track, return, or buy things again</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-8 bg-gray-50/50">
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Placed</p>
                        <p className="font-semibold text-gray-800">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                        <p className="font-semibold text-gray-800">₹{order.total}</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Dispatch To</p>
                        <p className="font-semibold text-secondary cursor-pointer hover:underline">New York, NY 10001</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order # {order.id}</p>
                      <div className="flex gap-3 text-sm font-semibold text-secondary">
                        <button className="hover:underline flex items-center gap-1"><FileText size={14}/> Invoice</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:underline">Order Details</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items & Status */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      {order.status === 'Delivered' ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <Clock className="text-amber-500" size={24} />
                      )}
                      <h3 className="text-xl font-bold text-primary">
                        {order.status} <span className="text-gray-500 text-lg font-medium tracking-normal">- {order.status === 'Delivered' ? 'Package was handed to resident' : 'Expected by Oct 28'}</span>
                      </h3>
                    </div>

                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-wrap md:flex-nowrap gap-6 items-start">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link to="/shop" onClick={onClose} className="text-lg font-bold text-primary hover:text-secondary transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">Size: {item.size} | Color: {item.color} | Qty: {item.qty}</p>
                          <div className="mt-4 flex gap-3">
                            <button className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors shadow-sm">
                              Buy it again
                            </button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
                              View your item
                            </button>
                          </div>
                        </div>
                        <div className="w-full md:w-auto flex flex-col gap-2 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                          <button className="w-full md:w-48 text-left px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                            Track package <ChevronRight size={16} className="text-gray-400" />
                          </button>
                          <button className="w-full md:w-48 text-left px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                            Return or replace items <ChevronRight size={16} className="text-gray-400" />
                          </button>
                          <button className="w-full md:w-48 text-left px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                            Write a product review <ChevronRight size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default OrdersModal;
