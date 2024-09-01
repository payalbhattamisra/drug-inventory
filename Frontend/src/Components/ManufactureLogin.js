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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/manufacturers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      console.log('Login successful:', result);
      // Handle successful login (e.g., redirect or store auth token)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., display error message to user)
    }
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
