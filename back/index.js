import express from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModels.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN stack tutorial!');
});

// Post a book
app.post('/books', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Sent all required fields (title, author, publishYear)',
            })
        }
    const newBook = {
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
});

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get a book by id
app.get('/books/:id', async (req, res) => {
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
});

// Update a book
app.put('/books/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Sent all required fields (title, author, publishYear)',
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) {
            return res.status(404).json({ message: 'Book  not found' });
        }
        return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

mongoose
.connect(uri)
.then (() => {
    console.log('App connected to DB');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});