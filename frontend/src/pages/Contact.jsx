import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-10"
          >
            <h1 className="text-4xl font-extrabold text-primary mb-6">Get in Touch</h1>
            <p className="text-gray-600 mb-8">Have a question or feedback? We would love to hear from you!</p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Map & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="h-64 bg-gray-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531550415!3d-37.81720974202164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1614736025132!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
            <div className="p-10 flex-grow flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-4 text-lg"><strong>Address:</strong> 123 Fashion Ave, Style City, NY 10001</p>
              <p className="text-gray-600 mb-4 text-lg"><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p className="text-gray-600 text-lg"><strong>Email:</strong> support@stylesphere.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
