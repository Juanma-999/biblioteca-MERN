import { Notification } from '../models/notificationModel.js';
import { User } from "../models/userModel.js";
import mongoose from 'mongoose';

const createNotification = async (req, res) => {
    const { receiver, title, walk, requester } = req.body;
    if (!receiver || !title || !walk || !requester) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const newNotification = new Notification({
        receiver: receiver,
        title: title,
        walk: walk,
        requester: requester,
    });
    try {
        const notification = await newNotification.save();
        return res.status(201).send({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const formattedId = new mongoose.Types.ObjectId(userId);

        const user = await User.findById(formattedId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const notifications = await Notification.find({ receiver: formattedId }).populate({
            path: 'receiver',
            select: '_id username email'
        }).populate({
            path: 'requester',
            select: '_id username email'
        }).populate({
            path: 'walk',
            select: '_id'
        });

        return res.status(200).json({
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).send({ message: error.message });
    }
};

export {
    createNotification,
    getNotificationsByUser
};