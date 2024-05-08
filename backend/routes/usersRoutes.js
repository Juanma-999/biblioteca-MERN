import express from 'express';
import { deleteUser, getAllUsers, getUserById, logInUser, registerUser, updateUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', logInUser);

router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.send({ message: 'Logged out successfully' });
    });
});

router.get('/', auth, getAllUsers);

router.get('/:id', auth, getUserById);

router.put('/:id', auth, updateUser);

router.delete('/:id', auth, deleteUser);

export default router;
