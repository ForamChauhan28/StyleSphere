import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCcw, ShieldCheck, AlertCircle, Calendar } from 'lucide-react';

const ReturnPolicyModal = ({ isOpen, onClose }) => {
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
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-primary px-8 py-6 flex justify-between items-center text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <RefreshCcw className="text-secondary" size={28} /> Return & Replace Items
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-8 text-gray-800">
             <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 mb-8 flex gap-4">
                <AlertCircle className="text-secondary flex-shrink-0" size={28} />
                <div>
                   <h3 className="font-bold text-lg text-primary mb-1">Hassle-Free Returns</h3>
                   <p className="text-sm text-gray-600">You can return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.</p>
                </div>
             </div>

             <h3 className="text-xl font-bold text-primary mb-6 border-b border-gray-100 pb-2">Terms & Conditions</h3>
             
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-primary text-lg">30-Day Return Window</h4>
                      <p className="text-gray-600 mt-1">Items must be returned within 30 days of the delivery date. After 30 days, we cannot offer you a refund or exchange.</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-primary text-lg">Original Condition Required</h4>
                      <p className="text-gray-600 mt-1">To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging with all tags attached.</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-primary text-lg">Non-Returnable Items</h4>
                      <p className="text-gray-600 mt-1">Certain goods are exempt from being returned. Perishable goods, intimate or sanitary goods, hazardous materials, and some clearance items are final sale. Gift cards are also non-returnable.</p>
                   </div>
                </div>
             </div>

             <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <h4 className="font-bold text-primary mb-3">Refund Process</h4>
                 <p className="text-sm text-gray-600 mb-3">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                 <p className="text-sm text-gray-600">If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.</p>
             </div>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-4">
             <button onClick={onClose} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
             </button>
             <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                Start a Return
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ReturnPolicyModal;
