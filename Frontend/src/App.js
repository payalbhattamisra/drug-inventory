 // src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductRegistration from './Components/ProductRegistration.js';
import FrontPage from './Components/FrontPage.js';
import ManufactureSignUp from "./Components/ManufactureSignUp.js";
import ConsumerSignUp from "./Components/ConsumerSignUp.js";
import GovtSignUp from "./Components/GovtSignUp.js";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={< FrontPage />} />
                <Route path="/ProductRegistration" element={<ProductRegistration />} />
                <Route path="/manufacture-signup" element={<ManufactureSignUp/>} />
                <Route path="/consumer-signup" element={<ConsumerSignUp/>} />
                 <Route path="/govt-signup" element={<GovtSignUp/> } />
            </Routes>
        </Router>
    );
};

export default App;
