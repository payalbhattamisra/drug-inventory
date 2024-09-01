 // src/FrontPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  },
  tap: {
    scale: 0.9
  }
};

const FrontPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="name"> 
        <h1 className="title">Choose Your Role</h1>
        <div className="buttons">
          <motion.button
            className="btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleNavigation('/manufacture-signup')}
          >
            Manufacture
          </motion.button>
          <motion.button
            className="btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleNavigation('/consumer-signup')}
          >
            Consumer
          </motion.button>
          <motion.button
            className="btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleNavigation('/govt-signup')}
          >
            Govt
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
