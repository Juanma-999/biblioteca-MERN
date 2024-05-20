import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Walk } from "../models/walkModel.js";

const getWalks = async (req, res) => {
    try {
        const walks = await Walk.find().populate({
            path: 'dogs',
        }).populate({
            path: 'user',
            select: {
                username: 1,
                _id: 1
            }
        });
        return res.status(200).json(walks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getWalksByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const walks = await Walk.find({ user: id }).populate('dogs');
        await Walk.populate(walks, {
            path: 'user',
            select: {
                username: 1,
                _id: 1,
                email: 1
            }
        });
        return res.status(200).json({
            count: walks.length,
            data: walks
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getWalkById = async (req, res) => {
    try {
        const { id } = req.params;
        const walk = await Walk.findById(id);
        return res.status(200).json({
            count: walk.length,
            data: walk
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const addWalk = async (req, res) => {
    try {
        const { dogs, location, frequency } = req.body;
        if (!dogs || !location || !frequency) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await User.findById(req.user).select("_id");
        const newWalk = {
            user: user,
            dogs,
            location,
            frequency,
        };
        const walk = await Walk.create(newWalk);
        return res.status(201).json(walk);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const updateWalk = async (req, res) => {
    const { dogs, location } = req.body;
    if (!dogs || !location) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const walk = await Walk.findById(req.params.id);
    if (!walk) {
        return res.status(400).json({ error: "Walk not found" });
    }
    const user = await User.findById(req.user._id);
    if (walk.user?._id?.toString() !== user._id.toString()) {
        return res.status(401).json({ error: "You do not own this walk" });
    }
    try {
        await Walk.updateOne({ _id: req.params.id }, { dogs, location });
        res.status(200).json({ success: "Walk updated", Walk });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteWalk = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const walk = await Walk.findById(req.params.id);
    if (!walk) {
        return res.status(400).json({ error: "Walk not found" });
    }
    const user = await User.findById(req.user._id);
    if (!walk.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        await Walk.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: "Walk deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getWalks, getWalkById, getWalksByUser, addWalk, updateWalk, deleteWalk };


