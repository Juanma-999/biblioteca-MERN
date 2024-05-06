import express from 'express';
import { addDog, deleteDog, getDogs, getDogById, updateDog, getDogsByUser } from '../controllers/dogController.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, addDog);

router.get('/', auth, getDogs);

router.get('/:id', auth, getDogById);

router.get('/user/:id', auth, getDogsByUser);

router.put('/:id', auth, updateDog);

router.delete('/:id', auth, deleteDog);

export default router;