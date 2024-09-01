import express from 'express';
import { registerConsumer } from '../controllers/ConsumerController.js';

const router = express.Router();

router.post('/signup', registerConsumer);

export default router;
