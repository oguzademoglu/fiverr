import express from 'express'
import { createGig, deleteGig, getGigById, getGigs, updateGig } from '../controllers/gigController.js';
import { verifyUser } from '../middlewares/verification.js';

const router = express.Router();

router.get('/', getGigs)
router.get('/:id', getGigById)
router.post('/:userId', verifyUser, createGig)
router.put('/:id/:userId', verifyUser, updateGig)
router.delete('/:id/:userId', verifyUser, deleteGig)


export default router;
