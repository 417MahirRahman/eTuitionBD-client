import React from 'react';
import { motion } from "framer-motion";
import How_It_Works from './How_It_Works';
import WhyChooseUs from './WhyChooseUs';
import DynamicStudent from './DynamicStudent';
import DynamicTutor from './DynamicTutor';
import BannerLogo from '../../assets/Banner-Picsart-AiImageEnhancer.jpg'

const Home = () => {
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
                Transform Your <span className="bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Learning Journey</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Bangladesh's premier tuition management platform connecting students with verified tutors. 
                Post requirements, find perfect matches, and achieve academic success with transparent workflows 
                and secure payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className='p-2'>
                <img className='w-full rounded-4xl' src={BannerLogo} alt="" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Tuition Post */}
      <DynamicStudent></DynamicStudent>

      {/* Dynamic Tutor Post */}
      <DynamicTutor></DynamicTutor>

      {/* How It Works Section */}
      <How_It_Works></How_It_Works>

      {/* Why Choose Us Section */}
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;