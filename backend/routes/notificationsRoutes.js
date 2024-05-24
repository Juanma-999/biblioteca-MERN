import express from 'express';
import auth from '../middlewares/auth.js';
import { createNotification, getNotificationsByUser } from '../controllers/notificationController.js';

const router = express.Router();


router.post('/', auth, createNotification);
router.get('/user/:userId', auth, getNotificationsByUser);

export default router;
