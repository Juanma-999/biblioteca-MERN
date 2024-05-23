import {Notification} from '../models/notificationModel.js';
import { User } from "../models/userModel.js";
import mongoose from 'mongoose';

const createNotification = async (req, res) => {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const newNotification = new Notification({
        user: req.body.user,
        title: req.body.title,
        text: req.body.text
    });
    try {
        const notification = await Notification.create(newNotification);
        return res.status(201).send({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotificationsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Received ID: ${id}`);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        const notifications = await Notification.find({ user: id }).populate({
            path: 'user',
            select: {
                _id: 1
            }
        });
        console.log(`Notifications found: ${notifications.length}`);
        return res.status(200).json({
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).send({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: `You must give a valid id: ${id}` });
    }
    const deleteNotification = await Notification.findById(id).exec();
    if (!deleteNotification) {
        return res
        .status(400)
        .json({ message: `Can't find a Notification with id: ${id}` });
    }
    const result = await deleteNotification.deleteOne();
    if (!result) {
        return res
        .status(400)
        .json({ message: `Can't delete the Notification with id: ${id}` });
    }
    res.json({ message: `Notification with id: ${id} deleted with success` });
};

const deleteAllNotifications = async (req, res) => {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: `You must give a valid id: ${id}` });
    }
    const NotificationsDeleteMany = await Notification.deleteMany({ user: id });
    if (!NotificationsDeleteMany) {
        return res
        .status(400)
        .json({ message: 'Error Deleting all Notifications as read' });
    }
    res.json({ message: `All Notifications for user ${id}marked was deleted` });
};

const markOneNotificationasread = async (req, res) => {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: `You must give a valid id: ${id}` });
    }
    const updateNotification = await Notification.find({ id }).exec();
    if (!updateNotification) {
        return res.status(400).json({ message: 'No Notifications found' });
    }
    updateNotification.read = false;
    await updateNotification.save();
    res.json(updateNotification);
};

const markAllNotificationsAsRead = async (req, res) => {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: `You must give a valid id: ${id}` });
    }
    const NotificationsUpdateMany = await Notification.updateMany(
        { user: id },
        { $set: { read: true } }
    );
    if (!NotificationsUpdateMany) {
        return res
        .status(400)
        .json({ message: 'Error Marking all Notifications as read' });
    }
    res.json({ message: `All Notifications for user ${id}marked as read` });
};

export {
    createNotification,
    getNotificationsByUser,
    deleteNotification,
    deleteAllNotifications,
    markOneNotificationasread,
    markAllNotificationsAsRead,
};