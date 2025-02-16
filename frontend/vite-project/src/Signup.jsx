import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Signup.css";
import axios from 'axios'
import { USER_API_END_POINT } from './const/const.js'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input.name)
    console.log(input.email);
    console.log(input.password);
    
    try {
    console.log(input);
      
      const res = await axios.post(`${USER_API_END_POINT}/registration`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) { 
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
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
                value={input.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={togglePassword} className="toggle-password">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p className="forgot-password">
                    Already ave an account <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
