import React, { useState } from 'react';
import './ManufactureLogin.css';

const ManufactureLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data submitted:', formData);
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <h2>Manufacture Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Gmail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <p>Don't have an account? <a href="/manufacture-signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default ManufactureLogin;
