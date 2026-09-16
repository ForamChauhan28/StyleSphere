import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, UploadCloud, Image as ImageIcon, Video, CheckCircle2 } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // Mock upload by creating local object URLs
    const newFiles = files.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
         onClose();
         // Reset state after close
         setTimeout(() => {
            setIsSubmitted(false);
            setRating(0);
            setReviewText('');
            setUploadedFiles([]);
         }, 300);
      }, 2000);
    }, 1500);
  };

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
          {isSubmitted ? (
             <div className="p-12 flex flex-col items-center justify-center text-center h-[500px]">
                <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                   <CheckCircle2 size={80} className="text-green-500 mb-6" />
                </motion.div>
                <h2 className="text-3xl font-bold text-primary mb-2">Thank you!</h2>
                <p className="text-gray-500 text-lg">Your review helps other shoppers make better choices.</p>
             </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                <h2 className="text-2xl font-extrabold text-primary">Write a Review</h2>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 p-8">
                 <div className="flex items-center gap-4 mb-8">
                    <img src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=200&auto=format&fit=crop" alt="Item" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                       <h3 className="font-bold text-primary">Vintage Denim Jacket</h3>
                       <p className="text-sm text-gray-500">How did you like this item?</p>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-3">Overall Rating *</label>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                             <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                             >
                                <Star 
                                   size={40} 
                                   className={`${(hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} 
                                />
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* Review Text */}
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Add a written review</label>
                       <textarea 
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-y"
                          placeholder="What did you like or dislike? How did it fit?"
                       />
                    </div>

                    {/* Media Upload */}
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Add photos or video</label>
                       <p className="text-xs text-gray-500 mb-3">Shoppers find images and videos more helpful than text alone.</p>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {uploadedFiles.map((file, idx) => (
                             <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                {file.type === 'image' ? (
                                   <img src={file.url} alt="upload" className="w-full h-full object-cover" />
                                ) : (
                                   <video src={file.url} className="w-full h-full object-cover" />
                                )}
                                <button 
                                   type="button"
                                   onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                                   className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                   <X size={14} />
                                </button>
                             </div>
                          ))}
                          
                          <button 
                             type="button"
                             onClick={() => fileInputRef.current?.click()}
                             className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:text-secondary hover:border-secondary hover:bg-secondary/5 transition-all"
                          >
                             <UploadCloud size={28} className="mb-2" />
                             <span className="text-xs font-bold text-center px-2">Upload<br/>Media</span>
                          </button>
                       </div>
                       <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          className="hidden" 
                          accept="image/*,video/*" 
                          multiple 
                       />
                    </div>
                 </form>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4 z-10">
                 <button onClick={onClose} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
                    Cancel
                 </button>
                 <button 
                    onClick={handleSubmit} 
                    disabled={rating === 0 || isSubmitting}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center min-w-[140px]"
                 >
                    {isSubmitting ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       "Submit"
                    )}
                 </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ReviewModal;
