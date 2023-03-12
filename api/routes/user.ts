import express from 'express';
import { createPlaceholderUsers } from '../controllers/userController';

const router = express.Router();

// create placeholder users
router.post('/createplaceholders', createPlaceholderUsers);

export default router;