import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import { USER_API_END_POINT } from "./const/const";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import axiosInstance from './const/axiosInstance'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission
        console.log("Submitting:", formData);
    
        try {
            const res = await axiosInstance.post("/login", formData); // Using axios instance
            console.log("res:")
            if (res.data.success) {
                console.log("Login successful:", res.data);
                localStorage.setItem("name", res.data.user.name)
                navigate("/"); // Pass user data correctly
            } else {
                console.error("Login failed:", res.data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during login:", error.response?.data || error.message);
        }
    };    

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="title">Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={togglePassword} className="toggle-password">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="forgot-password">
                    Create a new account. <a href="/signup">Signup</a>
        </p>
            </div>
        </div>
    );
};

export default Login;
