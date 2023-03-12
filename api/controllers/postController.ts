import { NextFunction, Response, Request } from "express";
import PostModel from "../models/post";

export async function getBestPosts(req: Request, res: Response, next: NextFunction) {
    /*
    TODO: For now, it looks for all posts in the DB, later on I will make it look for posts, whose subwettit value is included in the
    TODO: followedSubwettits array of the current user
    */
    // Finds all posts made within the last 8 hours
    const posts = await PostModel.find({ date: {$gte: new Date().valueOf() - 28800000} }).exec()
    // Sort the posts by score
    posts.sort((a, b) => a.score > b.score ? 1 : -1)

    res.json(posts)
};
