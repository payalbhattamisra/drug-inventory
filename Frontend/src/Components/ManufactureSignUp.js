 // src/ManufactureSignUp.jsx
import React, { useState } from 'react';
import './ManufactureSignUp.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add your form submission logic here, such as sending data to an API
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
      </form>
    </div>
  );
};

export default ManufactureSignUp;
