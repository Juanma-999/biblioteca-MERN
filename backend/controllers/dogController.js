import mongoose from "mongoose";
import { Dog } from "../models/dogModel.js";
import { User } from "../models/userModel.js";
import { Walk } from "../models/walkModel.js";

const getDogs = async (req, res) => {
    try {
        const dogs = await Dog.find({}).populate({
            path: 'user',
            select: {
                username: 1,
                _id: 1,
                email: 1,
            }
        });
        return res.status(200).json({ dogs });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getDogsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const dogs = await Dog.find({ user: id }).populate({
            path: 'user',
            select: {
                username: 1,
                _id: 1,
                email: 1,
            }
        });
        return res.status(200).json({
            count: dogs.length,
            data: dogs
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


const getDogById = async (req, res) => {
    try {
        const { id } = req.params;
        const dog = await Dog.findById(id);
        return res.status(200).json({
            count: dog.length,
            data: dog
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const addDog = async (req, res) => {
    try {
        if (!req.body.name || !req.body.age || !req.body.breed) {
            return res.status(400).send({ message: 'Name, age, and breed are required fields' });
        }
        const user = await User.findById(req.user).select("_id");
        const newDog = {
            user: user,
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            description: req.body.description
        };
        const dog = await Dog.create(newDog);
        return res.status(201).send({ success: true, data: dog });
    } catch (error) {
        console.error('Error adding dog:', error);
        res.status(500).send({ success: false, message: 'Failed to add dog', error: error.message });
    }
}

const updateDog = async (req, res) => {
    const { name, age, breed, description } = req.body;
    if (!name || !age || !breed) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
        return res.status(400).json({ error: "Dog not found" });
    }
    const user = await User.findById(req.user._id);
    if (dog.user?._id?.toString() !== user._id.toString()) {
        return res.status(401).json({ error: "You do not own this dog" });
    }
    try {
        await Dog.updateOne({ _id: req.params.id }, { name, age, breed, description });
        res.status(200).json({ success: "Dog updated", Dog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteDog = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
        return res.status(400).json({ error: "Dog not found" });
    }
    const user = await User.findById(req.user._id);
    if (!dog.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }
    const walks = await Walk.find({ dogs: req.params.id });
    if (walks.length > 0) {
        return res.status(400).json({ error: "Cannot delete a dog included in a walk" });
    }
    try {
        await Dog.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: "Dog deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getDogById, getDogsByUser, getDogs, addDog, updateDog, deleteDog };
