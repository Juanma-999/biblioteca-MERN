import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(400).json({ error: "Email is already taken" });
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    try {
        const user = await User.create({ email, password: hashed });
        const token = createToken(user._id)
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Missing required fields' });
    }
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({error: "Incorrect email"})
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return res.status(400).json({error: "Incorrect password"})
    }
    try {
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).send({ error: error.message });
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
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                message: 'Please provide all required fields (email, password)',
            });
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
            email: req.body.email,
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

export {getAllUsers, getUserById, updateUser, deleteUser, registerUser, logInUser}