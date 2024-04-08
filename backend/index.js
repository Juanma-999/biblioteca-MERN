import express from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: allow all origins with default of cors (*)
// app.use(cors());
//Option 2: allow custom origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN stack tutorial!');
});

app.use('/books', booksRoute);

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