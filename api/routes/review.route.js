import express from 'express'
import { verifyUser } from '../middlewares/verification.js';
import { createReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:gigId', getReviews)
router.post('/', verifyUser, createReview)
// router.delete('/:id', verifyUser, deleteReview)


export default router;
