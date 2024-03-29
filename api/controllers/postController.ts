import { NextFunction, Response, Request } from "express";
import PostModel from "../models/post";
import { Types } from "mongoose";

export async function getBestPosts(req: Request, res: Response, next: NextFunction) {
    /*
    TODO: For now, it looks for ALL posts in the DB, later on I will make it look for those posts, whose subwettit value is included
    TODO: in the followedSubwettits array of the current user
    */
    // Find all posts made within the last 8 hours
    let posts = await PostModel.find({ date: {$gte: new Date().valueOf() - 28800000} }).populate('formatted_subwettit').exec()
    // If there are less than 5 posts made within the last 8 hours, get all posts
    if(posts.length < 5) {
        posts = await PostModel.find().populate('formatted_subwettit').exec()
    }
    // Sort the posts by score and date
    posts.sort((a, b) => {
        if(((a.upvotes.length + a.downvotes.length) * a.date.valueOf()) >= ((b.upvotes.length + b.downvotes.length) * b.date.valueOf())) {
            return -1
        }
        return 1
    })
    res.json(posts)
};

export async function getHotPosts(req: Request, res: Response, next: NextFunction) {
    /*
    TODO: For now, it looks for ALL posts in the DB, later on I will make it look for those posts, whose subwettit value is included
    TODO: in the followedSubwettits array of the current user
    */
    // Find all posts made within the last hour
    let posts = await PostModel.find({ date: {$gte: new Date().valueOf() - 3600000} }).populate('formatted_subwettit').exec()
    // Sort the posts by score
    posts.sort((a, b) => {
        if((a.upvotes.length + a.downvotes.length) >= (b.upvotes.length + b.downvotes.length)) {
            return -1
        }
        return 1
    })
    res.json(posts)
};

export async function getRecentPosts(req: Request, res: Response, next: NextFunction) {
    /*
    TODO: For now, it looks for ALL posts in the DB, later on I will make it look for those posts, whose subwettit value is included
    TODO: in the followedSubwettits array of the current user
    */
    // Find all posts and sort them by date
    let posts = await PostModel.find().populate('formatted_subwettit').sort({date: -1}).exec()
    res.json(posts)
};

export async function createPlaceholderPosts(req: Request, res: Response, next: NextFunction) {
    const titles = ['This is a post', 'This is a post too', 'I am a post as well']
    const dates = [new Date(), new Date('10/10/2010'), new Date('11/11/2011')]
    const authors = [new Types.ObjectId('640e1a5aab985d310f9e5f5e'), new Types.ObjectId('640e1a5aab985d310f9e5f60'),
    new Types.ObjectId('640e1a5aab985d310f9e5f5f')]
    const upvotes = [[], [new Types.ObjectId('640e1a5aab985d310f9e5f5e'), new Types.ObjectId('640e1a5aab985d310f9e5f5f')], 
    [new Types.ObjectId('640e1a5aab985d310f9e5f5e')]]
    const downvotes = [[new Types.ObjectId('640e1a5aab985d310f9e5f60'), new Types.ObjectId('640e1a5aab985d310f9e5f5f')], [], []]
    const subwettits = [new Types.ObjectId('641393951e6ff19577381164'), new Types.ObjectId('641393951e6ff19577381165'), 
    new Types.ObjectId('641393951e6ff19577381166')]
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
            upvotes: upvotes[i],
            downvotes: downvotes[i],
            subwettit: subwettits[i],
            content: contents[i]
        })
        post.save()
    }
    res.json({success: true})
}