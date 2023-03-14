import express from 'express';
import { createplaceholderSubwettits, getAllSubwettits } from '../controllers/subwettitController';

const router = express.Router();

// create placeholder subwettits
router.post('/createplaceholders', createplaceholderSubwettits);

// GET all subwettits
router.get('/all', getAllSubwettits)

export default router;