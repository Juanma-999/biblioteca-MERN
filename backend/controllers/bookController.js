import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

const addBook = async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Book added succesfully',
            })
        }
        const user = await User.findById(req.user._id).select("_id");
        const newBook = {
            user: user,
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message});
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ books });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getUserBooks = async (req, res) => {
    const user = await User.findById(req.user._id);
    try {
        const userBooks = await Book.find({ user: user._id});
        return res.status(200).json({
            count: userBooks.length,
            data: userBooks
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const updateBook = async (req, res) => {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(400).json({ error: "Book not found" });
    }
    const user = await User.findById(req.user._id);
    if (book.user?._id?.toString() !== user._id.toString()) {
        return res.status(401).json({ error: "You do not own the book" });
    }
    try {
        await book.updateOne({ title, author, publishYear });
        res.status(200).json({ success: "Book was updated", book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(400).json({ error: "Book not found" });
    }
    const user = await User.findById(req.user._id);
    if (!book.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        await book.deleteOne();
        res.status(200).json({ success: "Book was deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getBookById, getUserBooks, getAllBooks, addBook, updateBook, deleteBook };