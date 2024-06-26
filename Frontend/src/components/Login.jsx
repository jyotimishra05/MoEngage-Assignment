import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useHistory } from "react-router-dom";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { userId } = response.data;
      console.log(response)
      localStorage.setItem("userId", userId);
      
      navigate("/search");
    } catch (error) {
        setError(error.response.data.error)
        // console.log(error.response.data.error);
      console.error("Error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border-2 border-gray-200 p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border-2 border-gray-200 p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Login
          </button>
        </form>
        {error&& <p className="p-2 font-semibold text-red-600">{error}</p>}
        <p className=" p-2">
          Don't have an Account ? {" "}
          <Link to="/signup" className="font-bold underline text-green-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
