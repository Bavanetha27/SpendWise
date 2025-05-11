import React, { Children, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

 

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const req = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password
      })
      dispatch({
        type: "LOGIN",
        payload: req.data.token,
      });
      console.log(req.data.token);
      localStorage.setItem("token", req.data.token);
      var isLoginSuccessful = req.data.loginStatus;
      if (isLoginSuccessful) {
        alert(req.data.response);
        navigate("/");
      } else {
        alert(req.data.response);
      }
    }catch(err){
      console.log("Error occured");
    }
  };

  return (
    <form onSubmit = {handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={email} onChange={(e) => { setEmail(e.target.value) }} required 
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={password} onChange={(e) => { setPassword(e.target.value) }} required 
      />
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
