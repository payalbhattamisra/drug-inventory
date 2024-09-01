 // src/routes/manufacturerRoutes.js

import express from 'express';
import { registerManufacturer, loginManufacturer  } from '../controllers/ManufactureController.js';
 
const router = express.Router();

// Ensure this route is correctly defined
router.post('/signup', registerManufacturer);
router.post('/login', loginManufacturer);
export default router;
