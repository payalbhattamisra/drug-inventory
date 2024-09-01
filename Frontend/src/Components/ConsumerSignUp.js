import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import './ConsumerSignUp.css';

const ConsumerSignUp = () => {
  const [formData, setFormData] = useState({
    instituteName: '',
    email: '',
    password: '',
    location: '',
    pincode: '',
    licenseNumber: ''
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
        const response = await fetch('http://localhost:8000/api/consumer/signup', {
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
      <h2>Consumer Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="instituteName">Institute/Hospital Name</label>
          <input 
            type="text" 
            id="instituteName" 
            name="instituteName" 
            value={formData.instituteName} 
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
          <label htmlFor="location">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
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
        <div className="form-group">
          <label htmlFor="licenseNumber">Hospital License Number</label>
          <input 
            type="text" 
            id="licenseNumber" 
            name="licenseNumber" 
            value={formData.licenseNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
        <p>Already have an account? <Link to="./login">Login</Link></p> {/* Link to login page */}
      </form>
    </div>
  );
};

export default ConsumerSignUp;
