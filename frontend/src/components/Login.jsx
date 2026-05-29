import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { motion } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { BACKEND_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });

      const isLoginSuccessful = res.data.loginStatus;

      if (isLoginSuccessful) {
        dispatch({ type: "LOGIN", payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("darkmode", res.data.darkMode);
        navigate("/dashboard");
      } else {
        alert(res.data.response);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        alert(err.response.data.response);
      } else {
        alert("Something went wrong during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 mb-4 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 dark:text-white transition-all outline-none";

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0B0C10] font-sans">
      
      {/* Left Column - Graphic/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-purple-700 to-blue-800 opacity-90 z-10"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob z-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000 z-20"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000 z-20"></div>

        <div className="relative z-30 flex flex-col items-center justify-center text-center px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
              <HiOutlineSparkles className="text-white text-5xl" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold font-display text-white mb-6 leading-tight"
          >
            Take Control of <br/> Your Wealth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-brand-100 font-medium max-w-md"
          >
            Join SpendWise today and experience a smarter way to track, manage, and optimize your financial life.
          </motion.p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        
        {/* Mobile blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none lg:hidden">
          <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-brand-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
             <Link to="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
                <HiOutlineSparkles className="text-brand-500 text-3xl" />
                <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                  SpendWise
                </span>
             </Link>
             <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white mb-3">Welcome back</h2>
             <p className="text-gray-500 dark:text-gray-400 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                 <a href="#" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={inputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 mt-6 bg-gray-900 dark:bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-600 dark:hover:bg-brand-500 transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-lg flex justify-center items-center gap-2"
              disabled={loading}
            >
               {loading ? (
                 <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : "Sign in"}
            </button>
          </form>

          <div className="mt-10 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-bold hover:text-brand-500 transition-colors">
              Sign up for free
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

