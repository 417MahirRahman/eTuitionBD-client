import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { number: "5,000+", label: "Students", delay: 0.1 },
    { number: "2,000+", label: "Tutors", delay: 0.2 },
    { number: "10,000+", label: "Classes Completed", delay: 0.3 },
    { number: "95%", label: "Satisfaction Rate", delay: 0.4 }
  ];

  return (
    <div>
      <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-slate-600">
              Trusted by thousands of students and tutors across Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: stat.delay }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                  {stat.number}
                </div>
                <p className="text-slate-600 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsSection;
