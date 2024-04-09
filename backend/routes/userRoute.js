import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

// Post a user
router.post('/', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({
                message: 'Please provide all required fields (username, password)',
            });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
        };
        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Get a user by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({
                message: 'Please provide all required fields (username, password)',
            });
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
            username: req.body.username,
            password: req.body.password,
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

export default router;
