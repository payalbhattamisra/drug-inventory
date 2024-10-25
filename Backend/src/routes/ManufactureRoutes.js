 // src/routes/manufacturerRoutes.js

import express from 'express';
import { registerManufacturer, loginManufacturer , getManufacturerDetails } from '../controllers/ManufactureController.js';
 
const router = express.Router();

// Ensure this route is correctly defined
router.post('/signup', registerManufacturer);
router.post('/login', loginManufacturer);
router.get('/profile' , getManufacturerDetails);

export default router;
