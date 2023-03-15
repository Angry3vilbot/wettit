import { NextFunction, Response, Request } from "express";
import SubwettitModel from "../models/subwettit";
import mongoose from "mongoose";

export async function createplaceholderSubwettits(req: Request, res: Response, next: NextFunction) {
    const titles = ['w/SubwettitOne', 'w/SubwettitZwei', 'w/SubwettitTres']
    const types = ['public', 'public', 'private']
    const nsfw = [true, false, false]
    const members = [[new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f5e')], [new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f60'),
    new mongoose.Types.ObjectId('640e1a5aab985d310f9e5f5f')], []]
    const dates = [new Date(), new Date('03/15/2022'), new Date('03/15/2021')]
    
    for (let i = 0; i <=  titles.length - 1; i++) {
        let subwettit = new SubwettitModel({
            title: titles[i],
            type: types[i],
            nsfw: nsfw[i],
            members: members[i],
            creation_date: dates[i]
        })
        subwettit.save()
    }
    res.json({success: true})
}

export async function getAllSubwettits(req: Request, res: Response, next: NextFunction) {
    const data = await SubwettitModel.find()

    res.json(data)
}

export async function getNewestSubwettits(req: Request, res: Response, next: NextFunction) {
    let data = await SubwettitModel.find().sort({creation_date: -1}).limit(5)
    res.json(data)
}

export async function getMostPopularSubwettits(req: Request, res: Response, next: NextFunction) {
    let data = await SubwettitModel.find().sort({members: -1}).limit(5)
    res.json(data)
}