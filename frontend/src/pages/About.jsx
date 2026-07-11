import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 md:p-16 text-center"
        >
          <h1 className="text-5xl font-extrabold text-primary mb-6">About StyleSphere</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We are redefining the future of fashion. StyleSphere merges cutting-edge 3D aesthetics with timeless clothing to create an unparalleled shopping experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
              <p className="text-gray-700">To empower individuals to express their unique identities through high-quality, sustainable, and futuristic fashion.</p>
            </div>
            <div className="bg-white/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
              <p className="text-gray-700">To become the global leader in digital-first clothing retail, seamlessly blending the physical and digital worlds.</p>
            </div>
            <div className="bg-white/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Team</h3>
              <p className="text-gray-700">A passionate group of designers, technologists, and fashion enthusiasts dedicated to delivering the best for our customers.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
