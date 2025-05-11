import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineCheckCircle } from "react-icons/hi";
import hero from "../assets/hero.png";

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500 font-sans">

      {/* Hero Section */}
      <section
        className="relative text-center px-6 py-40 rounded-b-3xl"
        style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent dark:from-gray-900/60 rounded-b-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">
            Smart Expense Categorization
          </h2>
          <p className="text-lg md:text-xl mb-8 drop-shadow-sm">
            Just describe your expenses in your own words — we'll do the rest with AI.
          </p>
          <button className="bg-blue-700 hover:bg-blue-900 transition duration-300 px-10 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-10 px-6 py-20 max-w-7xl mx-auto" data-aos="fade-up">
        {[
          {
            title: "Natural Language Input",
            desc: "Just write your expenses in a paragraph. We'll extract and categorize them instantly.",
            icon: <HiOutlineCheckCircle className="text-blue-500 text-5xl mb-4" />,
          },
          {
            title: "AI-Powered Categorization",
            desc: "Our AI model handles spelling mistakes, grammar errors, and more.",
            icon: <HiOutlineCheckCircle className="text-blue-500 text-5xl mb-4" />,
          },
          {
            title: "Dark & Light Themes",
            desc: "Switch themes seamlessly with a toggle. Your eyes will thank you.",
            icon: <HiOutlineCheckCircle className="text-blue-500 text-5xl mb-4" />,
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white/40 dark:bg-gray-800/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-transform hover:scale-105"
            data-aos="zoom-in"
          >
            {feat.icon}
            <h3 className="text-2xl font-bold mb-2">{feat.title}</h3>
            <p className="text-md text-gray-700 dark:text-gray-300">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="text-center px-6">
          <h2 className="text-4xl font-extrabold mb-10" data-aos="fade-up">
            How It Works
          </h2>
          <div className="md:flex md:justify-center gap-6">
            {[
              {
                step: "Step 1",
                description: "Describe your expenses in a simple paragraph.",
              },
              {
                step: "Step 2",
                description: "We use AI to process and categorize your expenses.",
              },
              {
                step: "Step 3",
                description: "Get detailed insights and track your spending.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-gray-700 shadow-xl rounded-2xl mb-6 md:mb-0 md:w-80"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">{step.step}</h3>
                <p className="text-gray-600 dark:text-gray-200">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="text-center py-20 px-6 max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold mb-6">Why Choose SpendWise?</h2>
        <p className="text-lg mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          SpendWise makes budgeting beautiful and effortless. Here's why our users love us:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Instant expense categorization with just a description.",
            "AI handles spelling and grammar mistakes for you.",
            "Toggle between light and dark themes for your convenience.",
            "Track and visualize your expenses for better budgeting.",
          ].map((benefit, i) => (
            <div key={i} className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105">
              <p className="text-md font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 py-20 px-6" data-aos="fade-up">
        <h2 className="text-3xl font-extrabold text-center mb-12">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {[
            {
              name: "John Doe",
              review:
                "SpendWise has made it so easy to track my expenses! The AI categorization is spot on, and the dark mode is a game-changer.",
            },
            {
              name: "Jane Smith",
              review:
                "I love how simple and intuitive the app is. I can finally stay on top of my finances without spending too much time on it.",
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg max-w-md mx-auto">
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">"{testimonial.review}"</p>
              <p className="font-semibold text-blue-800 dark:text-blue-400">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
