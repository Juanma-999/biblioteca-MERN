import express from 'express';
import { getWalks, getWalkById, getWalksByUser, addWalk, updateWalk, deleteWalk } from '../controllers/walkController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getWalks);
router.get('/user/:id', auth, getWalksByUser);
router.post('/', auth, addWalk);
router.get('/:id', auth, getWalkById);
router.put('/:id', auth, updateWalk);
router.delete('/:id', auth, deleteWalk);

export default router;