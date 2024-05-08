import express from 'express';
import { getWalks, getWalkById, getWalksByUser, addWalk, updateWalk, deleteWalk } from '../controllers/walkController.js';

const walksRoutes = express.Router();

walksRoutes.get('/', getWalks);
walksRoutes.get('/user/:id', getWalksByUser);
walksRoutes.post('/', addWalk);
walksRoutes.get('/:id', getWalkById);
walksRoutes.put('/:id', updateWalk);
walksRoutes.delete('/:id', deleteWalk);

export default walksRoutes;
