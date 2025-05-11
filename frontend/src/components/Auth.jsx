import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const bgGradient = isLogin
    ? 'from-indigo-500 to-purple-600'
    : 'from-purple-600 to-blue-500';

  return (
    <motion.div
      className={`h-screen flex items-center justify-center bg-gradient-to-br ${bgGradient} transition-all duration-700 ease-in-out p-4`}
      key={isLogin ? 'login-bg' : 'signup-bg'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative overflow-hidden"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold text-center text-indigo-700 mb-6"
        >
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {isLogin ? <Login /> : <Signup />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <button
            className="text-indigo-600 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
