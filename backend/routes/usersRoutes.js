import express from 'express';
import { deleteUser, getAllUsers, getUserById, logInUser, registerUser, updateUser } from '../controllers/userController.js';

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

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
