import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact Info */}
          <div className="bg-blue-600 text-white rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">CALL US</h2>
              <a className="link link-hover text-lg mb-2">Phone Number: 01231231230</a> <br />
              <a className="link link-hover text-lg">Email: eTuitionBD@gmail.com</a>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">LOCATION</h2>
              <p className="text-lg">
                Block-C, Banasree, Dhaka
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">BUSINESS HOURS</h2>
              <p className="text-lg mb-2">
                Open: Saturday – Thursday (10 am – 8 pm)
                <br />
                Closed: Friday
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full border-b-2 border-gray-300 outline-none py-2"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  className="w-full border-b-2 border-gray-300 outline-none py-2"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border-b-2 border-gray-300 outline-none py-2 "
                />
              </div>

              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full border-b-2 border-gray-300 outline-none py-2 resize-none "
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg text-center"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
