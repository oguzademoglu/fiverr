import express from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { verifyUser } from '../middlewares/verification.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', verifyUser, getUserById);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);


export default router;
