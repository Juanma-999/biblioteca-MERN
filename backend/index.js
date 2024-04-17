import express from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import cors from 'cors';
import 'dotenv/config.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: allow all origins with default of cors (*)
app.use(cors());
//Option 2: allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowHeaders: ['Content-Type'],
//     })
// );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN stack tutorial!');
});

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

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