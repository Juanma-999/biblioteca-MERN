import mongoose from "mongoose";
import { Dog } from "../models/dogModel.js";


const getDogs = async (req, res) => {
    try {
        const dogs = await Dog.find({});
        await Dog.populate(dogs, { path: 'user', select: 'email' });
        return res.status(200).json({ dogs });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getUserDogs = async (req, res) => {
    const user = await User.findById(req.user._id);
    try {
        const userDogs = await Dog.find({ user: user._id});
        return res.status(200).json({
            count: userDogs.length,
            data: userDogs
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

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
        if(!req.body.name || !req.body.age || !req.body.breed) {
            return res.status(400).send({
                message: 'Dog added succesfully',
            })
        }
        const user = await User.findById(req.user._id).select("_id");
        const newDog = {
            user: user,
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
        };
        const dog = await Dog.create(newDog);
        return res.status(201).send(dog);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message});
    }
}

const updateDog = async (req, res) => {
    const { name, age, breed } = req.body;
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
        return res.status(401).json({ error: "You do not own the Dog" });
    }
    try {
        await Dog.updateOne({ _id: req.params.id }, { name, age, breed });
        res.status(200).json({ success: "Dog was updated", Dog });
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
    try {
        await Dog.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: "Dog was deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getDogById, getUserDogs, getDogs, addDog, updateDog, deleteDog };
