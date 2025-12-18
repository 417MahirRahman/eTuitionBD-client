import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About <span>eTui</span>
            <span className="text-blue-600">tionBD</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Welcome to eTuitionBD, where we are passionate about connecting
            students with qualified tutors across Bangladesh. We offer a wide
            range of educational opportunities designed to help learners achieve
            academic success in the ever-evolving digital landscape.
          </p>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Trusted by Thousands
              </h3>
              <p className="text-slate-600">
                We have successfully connected thousands of students with
                qualified tutors, helping them unlock their potential and
                achieve academic goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Positive Student Feedback
              </h3>
              <p className="text-slate-600">
                We make it a priority to receive feedback from our students, who
                appreciate the personalization and relevance of our course
                materials.
              </p>
            </div>
          </div>
        </div>

        {/* Our Goals Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Goals</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Provide Practical Skills
              </h3>
              <p className="text-slate-600">
                We focus on delivering practical skills that are relevant to
                current educational demands. Our courses are designed to equip
                learners with the knowledge and tools needed to excel in their
                chosen fields.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Promote Collaboration and Community
              </h3>
              <p className="text-slate-600">
                We believe in the power of collaboration and peer learning. Our
                platform fosters a supportive and interactive community where
                learners can connect, share insights, and grow together.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Together, let's shape the future of digital education
              </h3>
              <p className="text-slate-600">
                Join us on this exciting learning journey and unlock your
                potential in education and development.
              </p>
            </div>
            <button className="px-6 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
