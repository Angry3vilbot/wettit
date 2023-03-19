import express from 'express';
import { createPlaceholderPosts, getBestPosts, getHotPosts, getRecentPosts } from '../controllers/postController';

const router = express.Router();

// POST placeholder posts
router.post('/createplaceholders', createPlaceholderPosts)

// GET all posts made in the last 8 hours and sort them by upvote count and date via a formula
router.get('/best', getBestPosts);

// GET all posts made in the last hour and sort them by upvote count 
router.get('/hot', getHotPosts);

// GET all posts and sort them by age - newest to oldest
router.get('/recent', getRecentPosts);

// GET all posts made in the last hour and sort them by upvote count
router.get('/top/hour', function(req, res, next) {
  
});

// GET all posts made today and sort them by upvote count
router.get('/top/day', function(req, res, next) {
  
});

// GET all posts made in the last week and sort them by upvote count
router.get('/top/week', function(req, res, next) {
  
});

// GET all posts made in the last month and sort them by upvote count
router.get('/top/month', function(req, res, next) {
  
});

// GET all posts made in the last year and sort them by upvote count
router.get('/top/year', function(req, res, next) {
  
});

// GET all posts and sort them by upvote count
router.get('/top/all', function(req, res, next) {
  
});

export default router;
