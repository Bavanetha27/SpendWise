import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from "./AuthContext";


const Signup = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp =async (event) =>{
      event.preventDefault();
        try{
          const res = await axios.post("https://spendwise-m6e5.onrender.com/signup",{
            userName:userName,
            email:email,
            password:password
          })
          console.log(res.data)
          if(res.data.signupStatus){ 
            dispatch({
              type: "LOGIN",
              payload: res.data.token,
            });
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("darkmode", res.data.darkMode);
            alert(res.data.response);
            navigate("/");
          }
          else{
            alert(res.data.response);
            navigate("/signup");
          }
        }
          catch(err){
            console.log(err);
          }
      
    }

  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 transition-all duration-700 ease-in-out p-4"
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
          className="text-3xl font-bold text-center text-purple-700 mb-6"
        >
          Create Account
        </motion.h2>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already registered?{' '}
          <Link to="/login"><button
            className="text-purple-600 font-semibold hover:underline"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button></Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
