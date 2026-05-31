import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineLightBulb, HiOutlineChartPie } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 overflow-hidden relative font-sans transition-colors duration-500">

      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-400/30 dark:bg-brand-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center z-10" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 font-medium text-sm mb-8 border border-brand-200 dark:border-brand-800/50">
          <HiOutlineSparkles className="animate-pulse" />
          <span>AI-Powered Financial Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold font-display leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
          Manage your money with <br />
          <span className="text-gradient">effortless precision</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Just describe your expenses in your own words. Our AI instantly extracts, categorizes, and provides actionable insights. No more manual entry.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup" className="px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto">
            Start for free
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-full glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 w-full sm:w-auto">
            Sign In
          </Link>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 w-full max-w-5xl animate-float" data-aos="fade-up" data-aos-delay="200">
          <div className="glass-card rounded-2xl p-4 md:p-6 border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-blue-500"></div>
            {/* Mockup UI Inner */}
            <div className="bg-gray-50 dark:bg-dark-card rounded-xl h-64 md:h-96 flex flex-col p-6 overflow-hidden relative">
              <div className="flex justify-between items-center mb-8">
                <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
              <div className="flex gap-6 h-full">
                <div className="w-1/3 flex flex-col gap-4">
                  <div className="w-full h-24 bg-brand-100 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-800/50"></div>
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"></div>
                </div>
                <div className="w-2/3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col p-4 gap-4">
                  <div className="w-full h-1/2 bg-gray-100 dark:bg-gray-900/50 rounded-lg"></div>
                  <div className="w-full h-12 bg-gray-100 dark:bg-gray-900/50 rounded-lg"></div>
                  <div className="w-full h-12 bg-gray-100 dark:bg-gray-900/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">Smarter way to track</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to take control of your finances, elegantly designed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Natural Language Input",
              desc: "Just write 'Bought groceries for ₹50 at Walmart'. We handle the categorization instantly.",
              icon: <HiOutlineSparkles className="text-brand-500 text-4xl mb-4" />,
            },
            {
              title: "Intelligent Insights",
              desc: "Visual charts and AI suggestions help you identify where you can save more money.",
              icon: <HiOutlineLightBulb className="text-blue-500 text-4xl mb-4" />,
            },
            {
              title: "Visual Analytics",
              desc: "Beautiful, interactive charts to visualize your spending patterns over time.",
              icon: <HiOutlineChartPie className="text-purple-500 text-4xl mb-4" />,
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100 dark:border-gray-700">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 font-display">{feat.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white/50 dark:bg-dark-card/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-display">Simple. Fast. <br /><span className="text-gradient">Effortless.</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We eliminated the friction of manual data entry. Our proprietary AI understands context, handles typos, and categorizes with precision.
              </p>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Describe", desc: "Type your expense naturally." },
                  { step: "02", title: "Analyze", desc: "AI extracts amount, category, and date." },
                  { step: "03", title: "Track", desc: "View in beautiful dashboards." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center border border-brand-200 dark:border-brand-800">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 font-display">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="glass-card rounded-3xl p-8 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-blue-500 rounded-3xl blur opacity-20 dark:opacity-30"></div>
                <div className="relative bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-inner">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl mb-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                    "Spent ₹15.50 at Starbucks for coffee and a sandwich"
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800/50">
                      <span className="font-semibold text-brand-700 dark:text-brand-300">Category:</span>
                      <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-sm shadow-sm">Food & Dining</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                      <span className="font-semibold text-blue-700 dark:text-blue-300">Amount:</span>
                      <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-sm shadow-sm font-mono">₹15.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 px-6 text-center" data-aos="fade-up">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-500/10 to-blue-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-display">Ready to take control?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of users who are managing their wealth with SpendWise. Experience the future of personal finance today.
            </p>
            <Link to="/signup" className="px-10 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg hover:bg-brand-600 dark:hover:bg-gray-200 transition-colors duration-300 shadow-xl inline-block">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
