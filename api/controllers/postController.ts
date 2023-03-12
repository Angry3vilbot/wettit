import { NextFunction, Response, Request } from "express";
import PostModel from "../models/post";
import { Types } from "mongoose";

export async function getBestPosts(req: Request, res: Response, next: NextFunction) {
    /*
    TODO: For now, it looks for ALL posts in the DB, later on I will make it look for those posts, whose subwettit value is included
    TODO: in the followedSubwettits array of the current user
    */
    // Finds all posts made within the last 8 hours
    const posts = await PostModel.find({ date: {$gte: new Date().valueOf() - 28800000} }).exec()
    // Sort the posts by score
    posts.sort((a, b) => a.score > b.score ? 1 : -1)

    res.json(posts)
};

export async function createPlaceholderPosts(req: Request, res: Response, next: NextFunction) {
    const titles = ['This is a post', 'This is a post too', 'I am a post as well']
    const dates = [new Date(), new Date('10/10/2010'), new Date('11/11/2011')]
    const authors = [new Types.ObjectId('640e1a5aab985d310f9e5f5e'), new Types.ObjectId('640e1a5aab985d310f9e5f60'),
    new Types.ObjectId('640e1a5aab985d310f9e5f5f')]
    const scores = [1100, 23, 53000]
    const subwettits = [new Types.ObjectId('640e1f4984d1720caf9d2252'), new Types.ObjectId('640e1f4984d1720caf9d2253'), 
    new Types.ObjectId('640e1f4984d1720caf9d2254')]
    const contents = ['DASFSAFGSGASGsdsaFASf ASfasfsaf ASFs aFsafAS FASF ASf', `Lorem
    Ipsum
    Dolor
    Sit
    Amet!`, 'Omegalul lmaoooo']

    for (let i = 0; i <=  titles.length - 1; i++) {
        let post = new PostModel({
            title: titles[i],
            date: dates[i],
            author: authors[i],
            score: scores[i],
            subwettit: subwettits[i],
            content: contents[i]
        })
        post.save()
    }
    res.json({success: true})
}