import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import contact from '../assets/contact.png';
import { BACKEND_URL } from '../config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message };

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName(''); setEmail(''); setMessage('');
      } else {
        const err = await response.json();
        alert(`Failed: ${err.message}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error sending message. Try again later.');
    }
  };

  const inputClasses = "w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 mb-4 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 dark:text-white transition-all outline-none";

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
         <div className="absolute top-[40%] left-[10%] w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-purple-500"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="flex justify-center items-center" data-aos="fade-right">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-full blur-2xl opacity-20 dark:opacity-30"></div>
                <img src={contact} alt="Contact Illustration" className="relative z-10 w-full max-w-sm rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Form Section */}
            <div data-aos="fade-left">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
                    <input type="email" id="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} required />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} className={inputClasses} required></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-brand-600 dark:hover:bg-gray-200 transition-colors shadow-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Socials */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center" data-aos="fade-up">
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Or connect with us on social media</p>
            <div className="flex justify-center gap-8">
              <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-full text-brand-600 hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-900/30 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-full text-blue-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-full text-pink-500 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/30 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-full text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/30 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
