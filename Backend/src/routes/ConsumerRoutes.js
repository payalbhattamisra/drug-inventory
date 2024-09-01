import express from 'express';
import { registerConsumer, loginconsumer } from '../controllers/ConsumerController.js';

const router = express.Router();

router.post('/signup', registerConsumer);
router.post('/login', loginconsumer);
export default router;
