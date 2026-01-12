import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Atom,
  BookOpen,
  Monitor,
  FlaskConical,
  Microscope,
  Book,
  Globe,
} from "lucide-react";

const FeaturedSubjectsSection = () => {
  const subjects = [
    {
      id: 1,
      name: "Math",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Physics",
      icon: Atom,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "English",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      name: "ICT",
      icon: Monitor,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      name: "Chemistry",
      icon: FlaskConical,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 6,
      name: "Biology",
      icon: Microscope,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 7,
      name: "Bangla",
      icon: Book,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 8,
      name: "Social Science",
      icon: Globe,
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Featured Subjects
          </h2>
          <p className="text-xl text-slate-600">
            Explore our comprehensive range of subjects and academic levels
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg text-center cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 bg-linear-to-br ${subject.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">
                  {subject.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSubjectsSection;
