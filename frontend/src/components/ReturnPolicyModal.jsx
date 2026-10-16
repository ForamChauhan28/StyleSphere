import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCcw, ShieldCheck, AlertCircle, Calendar, CheckCircle2, ArrowLeft, Truck, PackageCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ReturnPolicyModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('policy'); // 'policy' | 'form' | 'success'
  const [reason, setReason] = useState('Size too small / too large');
  const [resolution, setResolution] = useState('refund');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnId, setReturnId] = useState('RET-9824-7712');
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('policy');
      setIsSubmitting(false);
    }, 300);
  };

  const handleStartReturn = () => {
    setStep('form');
  };

  const handleSubmitReturn = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `RET-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
      setReturnId(generatedId);
      setIsSubmitting(false);
      setStep('success');
      addToast('Return request submitted successfully!', 'success');
    }, 800);
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" data-lenis-prevent="true">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={handleClose}
          className="absolute inset-0 bg-primary/60 backdrop-blur-sm" 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          data-lenis-prevent="true"
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-primary px-8 py-6 flex justify-between items-center text-white flex-shrink-0">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <RefreshCcw className="text-secondary" size={28} />
              {step === 'policy' && 'Return & Replace Items'}
              {step === 'form' && 'Start a Return Request'}
              {step === 'success' && 'Return Confirmed'}
            </h2>
            <button 
              onClick={handleClose}
              className="p-2 text-gray-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div 
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            style={{ overscrollBehavior: 'contain' }}
            className="overflow-y-auto flex-1 p-8 text-gray-800"
          >
            {step === 'policy' && (
              <>
                <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 mb-8 flex gap-4">
                  <AlertCircle className="text-secondary flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">Hassle-Free Returns</h3>
                    <p className="text-sm text-gray-600">
                      You can return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.
                    </p>
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
              </>
            )}

            {step === 'form' && (
              <div className="space-y-6">
                {/* Item Details */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=200&auto=format&fit=crop" 
                    alt="Vintage Denim Jacket" 
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-base">Vintage Denim Jacket</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Order #ORD-9824-7712 • Size: M • Color: Blue</p>
                    <p className="text-sm font-bold text-secondary mt-1">₹7,469</p>
                  </div>
                </div>

                {/* Reason Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Return *</label>
                  <select 
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                  >
                    <option value="Size too small / too large">Size didn't fit (too small or too large)</option>
                    <option value="Item defective or damaged">Item defective or damaged</option>
                    <option value="Doesn't match description">Item doesn't match description or photos</option>
                    <option value="Changed mind">Changed my mind / no longer needed</option>
                    <option value="Received wrong item">Received wrong item</option>
                  </select>
                </div>

                {/* Resolution Choice */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Resolution *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setResolution('refund')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        resolution === 'refund' 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-bold text-primary text-sm">Full Refund</p>
                      <p className="text-xs text-gray-500 mt-1">₹7,469 back to original payment method</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResolution('exchange')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        resolution === 'exchange' 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-bold text-primary text-sm">Free Exchange</p>
                      <p className="text-xs text-gray-500 mt-1">Swap for Size L or different color</p>
                    </button>
                  </div>
                </div>

                {/* Additional Comments */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Comments (Optional)</label>
                  <textarea 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                    placeholder="Tell us any details to help process your request faster..."
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                  />
                </div>

                {/* Doorstep Pickup Note */}
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 text-xs">
                  <Truck size={20} className="text-blue-600 flex-shrink-0" />
                  <span>Free doorstep pickup scheduled from: <strong>New York, NY 10001</strong></span>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-extrabold text-primary mb-2">Return Request Submitted!</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Return ID: <span className="font-mono font-bold text-primary text-base">{returnId}</span>
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left max-w-md w-full space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <PackageCheck size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary">Doorstep Pickup Scheduled</p>
                      <p className="text-xs text-gray-500">Pickup window: Tomorrow between 10:00 AM – 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary">Prepaid Return Label</p>
                      <p className="text-xs text-gray-500">Sent to your registered email. Simply keep the item packed.</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  {resolution === 'refund' 
                    ? 'Your refund of ₹7,469 will be processed immediately after item verification.' 
                    : 'Your replacement item will be dispatched as soon as pickup is confirmed.'}
                </p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-4 flex-shrink-0">
            {step === 'policy' && (
              <>
                <button 
                  onClick={handleClose} 
                  className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleStartReturn}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <RefreshCcw size={18} />
                  Start a Return
                </button>
              </>
            )}

            {step === 'form' && (
              <>
                <button 
                  onClick={() => setStep('policy')} 
                  className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button 
                  onClick={handleSubmitReturn}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Confirm & Schedule Pickup'
                  )}
                </button>
              </>
            )}

            {step === 'success' && (
              <button 
                onClick={handleClose} 
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-md cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ReturnPolicyModal;
