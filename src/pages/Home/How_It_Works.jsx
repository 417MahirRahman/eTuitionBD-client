import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, CreditCard } from "lucide-react";

const How_It_Works = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How eTuitionBD Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple, efficient, and secure process for students and tutors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-b from-slate-50 to-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                01
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Post or Browse Tuitions
              </h3>
              <p className="text-slate-600">
                Students post tuition requirements or browse available
                opportunities. Tutors can view and apply to suitable positions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-b from-slate-50 to-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                02
              </div>
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Connect & Communicate
              </h3>
              <p className="text-slate-600">
                Once matched, students and tutors can communicate directly
                through our secure platform to discuss details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-b from-slate-50 to-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                03
              </div>
              <CreditCard className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Secure Payment & Tracking
              </h3>
              <p className="text-slate-600">
                Complete payments through our secure system and track all
                tuition activities with detailed analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default How_It_Works;
