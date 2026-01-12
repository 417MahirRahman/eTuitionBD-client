import React from "react";
import { motion } from "framer-motion";

const LearningModesSection = () => {
  const learningModes = [
    {
      id: 1,
      title: "Home Tuition",
      icon: "🏠",
      description: "Personalized one-on-one tutoring at your home with verified local tutors.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Online Classes",
      icon: "💻",
      description: "Interactive virtual sessions with expert tutors from anywhere, anytime.",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: "Group Tuition",
      icon: "🏫",
      description: "Collaborative learning environment with small groups for better engagement.",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div>
      <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Flexible Learning Modes
            </h2>
            <p className="text-xl text-slate-600">
              Choose the perfect learning style that fits your family's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 ${mode.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform text-3xl`}>
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {mode.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {mode.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningModesSection;
