 // src/ManufactureSignUp.jsx
import React, { useState } from 'react';
import './ManufactureSignUp.css';
import {Link} from 'react-router-dom';
const ManufactureSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pincode: ''
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
        const response = await fetch('http://localhost:8000/api/manufacturers/signup', {
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
        console.log('Manufacturer registered successfully:', result);
    } catch (error) {
        console.error('Server error:', error);
    }
};


  return (
    <div className="signup-container">
      <h2>Manufacture Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input 
            type="text" 
            id="pincode" 
            name="pincode" 
            value={formData.pincode} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
        <p>Already have an account  ?<Link to ="./Login">    Login</Link></p>
      </form>
    </div>
  );
};

export default ManufactureSignUp;
