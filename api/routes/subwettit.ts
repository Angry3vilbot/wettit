import express from 'express';
import { createplaceholderSubwettits } from '../controllers/subwettitController';

const router = express.Router();

// create placeholder subwettits
router.post('/createplaceholders', createplaceholderSubwettits);

export default router;