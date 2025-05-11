import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp =async (event) =>{
      event.preventDefault();
        try{
          const req = await axios.post("http://localhost:3000/signup",{
            userName:userName,
            email:email,
            password:password
          })
          alert(req.data.response);
          console.log(req.data.token);
          if(req.data.signupStatus){
            navigate("/");
          }
          else{
            alert(req.data.response);
            navigate("/auth")
          }
        }
          catch(err){
            console.log(err);
          }
      
    }

    return (
        <form className="space-y-4" onSubmit={handleSignUp}>
        <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={userName} onChange={(e)=>{setUsername(e.target.value)}} required
        />
        <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email} onChange={(e)=>{setEmail(e.target.value)}} required
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password} onChange={(e)=>{setPassword(e.target.value)}} required
        />
        <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
            Sign Up
        </button>
        </form>
    );
    };

export default Signup;
