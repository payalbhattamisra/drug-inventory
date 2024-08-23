 // src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductRegistration from './Components/ProductRegistration.js';
 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductRegistration />} />
                
            </Routes>
        </Router>
    );
};

export default App;
