import express from 'express';
import { createplaceholderSubwettits, getAllSubwettits, getMostPopularSubwettits, getNewestSubwettits, getSubwettitData } from '../controllers/subwettitController';

const router = express.Router();

// create placeholder subwettits
router.post('/createplaceholders', createplaceholderSubwettits);

// GET all subwettits
router.get('/all', getAllSubwettits)

// GET newest subwettits
router.get('/newest', getNewestSubwettits)

// GET subwettits with the most members
router.get('/most-popular', getMostPopularSubwettits)

// GET subwettit by _id
router.get('/:id', getSubwettitData)

export default router;