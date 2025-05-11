import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import React Icons
import contact from "../assets/contact.png";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-28">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6" data-aos="fade-up">
          Get in Touch with Us
        </h2>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Image or Illustration */}
          <div className="hidden md:flex items-center justify-center" data-aos="fade-right">
            <img
              src={contact}
              alt="Contact Illustration"
              className="rounded-xl w-full h-auto"
            />
          </div>

          {/* Right Side - Form */}
          <div data-aos="fade-left">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  data-aos="zoom-in-up"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer with Social Media Icons */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400" data-aos="fade-up">
          <p>Or contact us via:</p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="text-3xl text-blue-500 hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="#" className="text-3xl text-blue-400 hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-3xl text-pink-500 hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-3xl text-blue-800 hover:text-blue-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
