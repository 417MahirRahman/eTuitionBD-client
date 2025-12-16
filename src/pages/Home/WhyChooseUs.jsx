import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Award } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div>
      <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose eTuitionBD?
            </h2>
            <p className="text-xl text-slate-600">
              We provide the tools, support, and expertise to help you succeed
              academically
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Verified Tutors
              </h3>
              <p className="text-slate-600 text-sm">
                All tutors undergo background verification and qualification
                checks to ensure quality education.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Proven Results
              </h3>
              <p className="text-slate-600 text-sm">
                95% of students improve their grades within 3 months of using
                our platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Direct Communication
              </h3>
              <p className="text-slate-600 text-sm">
                Seamless messaging and video calling features for effective
                student-tutor interaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
