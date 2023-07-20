import express from 'express'
import { getOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders)
router.post('/:gigId', createOrder)

export default router;
