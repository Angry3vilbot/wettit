import { NextFunction, Response, Request } from "express";
import SubwettitModel from "../models/subwettit";
import mongoose from "mongoose";

export async function createplaceholderSubwettits(req: Request, res: Response, next: NextFunction) {
    const titles = ['Subwettit One', 'Subwettit Zwei', 'Subwettit Tres']
    const types = ['public', 'public', 'private']
    const nsfw = [true, false, false]
    const members = [[new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f5e')], [new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f60'),
    new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f5f')], []]
    
    for (let i = 0; i <=  titles.length - 1; i++) {
        let subwettit = new SubwettitModel({
            title: titles[i],
            type: types[i],
            nsfw: nsfw[i],
            members: members[i]
        })
        subwettit.save()
    }
    res.json({success: true})
}