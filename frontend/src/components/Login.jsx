import  {useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { motion } from 'framer-motion';

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
      const res = await axios.post("https://spendwise-m6e5.onrender.com/login", {
        email,
        password,
      });

      const isLoginSuccessful = res.data.loginStatus;

      if (isLoginSuccessful) {
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("darkmode", res.data.darkMode);
        alert(res.data.response);
        navigate("/");
      } else {
        alert(res.data.response);
        navigate("/login");
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


  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 transition-all duration-700 ease-in-out p-4"
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
          Welcome Back!
        </motion.h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
             {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/signup"><button
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </button></Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

