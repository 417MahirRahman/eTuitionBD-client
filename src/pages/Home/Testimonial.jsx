import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Ahmed",
      avatar: "https://placehold.co/80x80/3b82f6/ffffff?text=RA",
      review: "I improved my math result in just 2 months!",
      result: "Grade improved from C to A",
      rating: 5
    },
    {
      id: 2,
      name: "Fatima Rahman",
      avatar: "https://placehold.co/80x80/10b981/ffffff?text=FR",
      review: "My English speaking confidence has dramatically increased.",
      result: "Scored 92% in final exam",
      rating: 5
    },
    {
      id: 3,
      name: "Karim Hossain",
      avatar: "https://placehold.co/80x80/f59e0b/ffffff?text=KH",
      review: "The physics concepts finally make sense now!",
      result: "Passed competitive exam with top marks",
      rating: 5
    }
  ];

  return (
    <div>
      <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Real results from real students who transformed their academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 italic mb-4">"{testimonial.review}"</p>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-700">
                    {testimonial.result}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsSection;
