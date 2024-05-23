import { Router } from 'express';
import {
    createNotification,
    getNotificationsByUser,
    deleteNotification,
    deleteAllNotifications,
    markOneNotificationasread,
    markAllNotificationsAsRead,
} from '../controllers/notificationController.js';
const notificationsRoutes = Router();

notificationsRoutes.post('/', createNotification);
notificationsRoutes.get('/user/:id', getNotificationsByUser);
notificationsRoutes.delete('/:id', deleteNotification);
notificationsRoutes.delete('/', deleteAllNotifications);
notificationsRoutes.put('/:id', markOneNotificationasread);
notificationsRoutes.put('/', markAllNotificationsAsRead);

export default notificationsRoutes;
