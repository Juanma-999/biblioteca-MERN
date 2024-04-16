import { User } from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

const signUpUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                message: 'Please provide all required fields (username, password)',
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = {
            username,
            password: hashedPassword,
        };
        const user = await User.create(newUser);
        const token = createToken(user._id);
        return res.status(200).json({ username, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
}

const logInUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({
            message: 'Please provide all required fields (username, password)',
        });
    }
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(400).json({error: "Incorrect username"})
    }
    const match = await bcryptjs.compare(password, user.password);
    if(!match) {
        return res.status(400).json({error: "Incorrect password"})
    }
    try {
        const token = createToken(user._id);
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}



const getAllUsers = async (req, res) => {
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
}

const getUserById = async (req, res) => {
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
}

const updateUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
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
}

export {getAllUsers, getUserById, updateUser, deleteUser, signUpUser, logInUser}