import express from 'express';
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/bookController.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, addBook);

router.get('/', auth, getAllBooks);

router.get('/:id', auth, getBookById);

router.put('/:id', auth, updateBook);

router.delete('/:id', auth, deleteBook);

export default router;