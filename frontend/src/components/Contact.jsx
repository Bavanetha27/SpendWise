import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import contact from '../assets/contact.png';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-16">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6 sm:mb-10"
          data-aos="fade-up"
        >
          Get in Touch with Us
        </h2>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Image Section */}
          <div className="flex justify-center items-center" data-aos="fade-right">
            <img
              src={contact}
              alt="Contact Illustration"
              className="rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>

          {/* Form Section */}
          <div data-aos="fade-left">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  data-aos="zoom-in-up"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-600 dark:text-gray-400" data-aos="fade-up">
          <p>Or contact us via:</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-2xl sm:text-3xl text-blue-500 hover:text-blue-400 transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl sm:text-3xl text-blue-400 hover:text-blue-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl sm:text-3xl text-pink-500 hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl sm:text-3xl text-blue-800 hover:text-blue-600 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
