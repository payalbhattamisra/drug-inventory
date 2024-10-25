import express from 'express';
import { createProduct, getProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/products', createProduct);
// Get a specific product by ID
router.get('/products/:id', getProduct);

export default router;
