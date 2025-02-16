import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "./const/const";
import "./Home.css";
import axiosInstance from './const/axiosInstance'

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem("name");

    if (userName) {
      setUser(userName);
    } else {
      navigate("/login");
    }
  }, [navigate]); // Runs only on component mount

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(`${USER_API_END_POINT}/logout`); // Ensure `axios` is used properly

      if (res.data.success) {
        console.log("Logout successful");
        localStorage.removeItem("name"); // Remove user from localStorage
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", res.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="home-box">
        <h2 className="welcome-text">Welcome, {user}</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
