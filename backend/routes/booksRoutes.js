import express from 'express';
import { addBook, getUserBooks, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/bookController.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, addBook);

router.get('/', auth, getAllBooks);

router.get('/', auth, getUserBooks);

router.get('/:id', auth, getBookById);

router.put('/:id', auth, updateBook);

router.delete('/:id', auth, deleteBook);

export default router;